import { HTTP_STATUS } from '../../errors.ts';
import { logger } from '../../logger.ts';
import { fetchWithRetry } from '../retry.ts';
import { parseSSEStream } from '../stream-utils.ts';
import type {
  LLMChatRequest,
  LLMChatResponse,
  LLMProvider,
  LLMStreamResult,
  ModelConfig,
} from '../types.ts';

export class BaseLLMProvider implements LLMProvider {
  protected config: ModelConfig;
  protected apiKey: string;

  constructor(config: ModelConfig) {
    this.config = config;
    const key = Deno.env.get(config.apiKeyEnvVar);
    if (!key) {
      throw new Error(`Missing API key: ${config.apiKeyEnvVar}`);
    }
    this.apiKey = key;
  }

  protected getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  protected buildBody(request: LLMChatRequest): Record<string, unknown> {
    const body: Record<string, unknown> = {
      model: this.config.model,
      messages: request.messages,
    };

    if (request.temperature !== undefined) body.temperature = request.temperature;
    if (request.maxTokens !== undefined) body.max_tokens = request.maxTokens;
    if (request.stream !== undefined) body.stream = request.stream;
    if (request.tools) body.tools = request.tools;
    if (request.toolChoice) body.tool_choice = request.toolChoice;

    return body;
  }

  private logRequest(mode: 'chat' | 'stream', request: LLMChatRequest) {
    logger.info(`LLM request [${mode}]`, {
      provider: this.config.provider,
      model: this.config.model,
      temperature: request.temperature,
      maxTokens: request.maxTokens,
      messagesCount: request.messages.length,
      hasTools: !!request.tools,
    });
  }

  private logResponse(mode: 'chat' | 'stream', latencyMs: number, usage?: Record<string, unknown>) {
    logger.info(`LLM response [${mode}]`, {
      provider: this.config.provider,
      model: this.config.model,
      latencyMs,
      ...(usage && {
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        totalTokens: usage.total_tokens,
      }),
    });
  }

  private logRateLimits(response: Response) {
    const remaining = response.headers.get('x-ratelimit-remaining-requests');
    const limit = response.headers.get('x-ratelimit-limit-requests');
    const remainingTokens = response.headers.get('x-ratelimit-remaining-tokens');
    const reset = response.headers.get('x-ratelimit-reset-requests');

    if (remaining || limit) {
      logger.info('LLM rate limits', {
        provider: this.config.provider,
        remaining,
        limit,
        remainingTokens,
        reset,
      });
    }
  }

  private async doFetch(request: LLMChatRequest, stream: boolean): Promise<Response> {
    const body = this.buildBody({ ...request, stream });

    const response = await fetchWithRetry(
      (signal) =>
        fetch(this.config.baseUrl, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(body),
          signal,
        }),
      { maxRetries: this.config.maxRetries, timeoutMs: this.config.timeoutMs }
    );

    if (response.status === HTTP_STATUS.PAYMENT_REQUIRED && this.config.fallbackModel) {
      logger.warn('LLM payment required, switching to fallback model', {
        provider: this.config.provider,
        originalModel: this.config.model,
        fallbackModel: this.config.fallbackModel,
      });

      const { fallbackModel } = this.config;
      const fallbackConfig = {
        ...this.config,
        model: fallbackModel,
        fallbackModel: undefined,
      };
      const fallbackBody: Record<string, unknown> = {
        ...body,
        model: fallbackConfig.model,
      };

      return fetchWithRetry(
        (signal) =>
          fetch(fallbackConfig.baseUrl, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(fallbackBody),
            signal,
          }),
        { maxRetries: fallbackConfig.maxRetries, timeoutMs: fallbackConfig.timeoutMs }
      );
    }

    return response;
  }

  async chat(request: LLMChatRequest): Promise<LLMChatResponse> {
    this.logRequest('chat', request);
    const startTime = Date.now();

    const response = await this.doFetch(request, false);

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('LLM chat request failed', {
        provider: this.config.provider,
        model: this.config.model,
        status: response.status,
        latencyMs: Date.now() - startTime,
        error: errorText,
      });
      throw new Error(`LLM request failed (${response.status}): ${errorText}`);
    }

    this.logRateLimits(response);

    const data = await response.json();
    const choice = data.choices?.[0];

    this.logResponse('chat', Date.now() - startTime, data.usage);

    return {
      content: choice?.message?.content ?? null,
      toolCalls: choice?.message?.tool_calls?.map(
        (tc: { function: { name: string; arguments: string } }) => ({
          name: tc.function.name,
          arguments: tc.function.arguments,
        })
      ),
      finishReason: choice?.finish_reason ?? 'unknown',
    };
  }

  async chatStream(request: LLMChatRequest): Promise<LLMStreamResult> {
    this.logRequest('stream', request);
    const startTime = Date.now();

    const response = await this.doFetch(request, true);

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('LLM stream request failed', {
        provider: this.config.provider,
        model: this.config.model,
        status: response.status,
        latencyMs: Date.now() - startTime,
        error: errorText,
      });
      throw new Error(`LLM stream request failed (${response.status}): ${errorText}`);
    }

    this.logRateLimits(response);

    logger.info('LLM stream connected', {
      provider: this.config.provider,
      model: this.config.model,
      connectionMs: Date.now() - startTime,
    });

    return parseSSEStream(response);
  }
}
