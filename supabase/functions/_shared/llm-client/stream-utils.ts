import { logger } from '../logger.ts';

import type { LLMStreamResult } from './types.ts';

interface ParseSSEOptions {
  onToken?: (token: string) => void;
  inactivityTimeoutMs?: number;
}

export const parseSSEStream = (response: Response, opts?: ParseSSEOptions): LLMStreamResult => {
  const { onToken, inactivityTimeoutMs = 10_000 } = opts ?? {};
  let accumulated = '';
  let resolved = false;
  let resolveError: (value: { error: Error | null }) => void;

  const done = new Promise<{ error: Error | null }>((resolve) => {
    resolveError = resolve;
  });

  const safeResolve = (value: { error: Error | null }) => {
    if (resolved) return;
    resolved = true;
    resolveError(value);
  };

  const safeClose = (controller: ReadableStreamDefaultController) => {
    try {
      controller.close();
    } catch (closeError) {
      logger.warn('Stream controller already closed', { error: closeError });
    }
  };

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      if (!response.body) {
        safeResolve({ error: null });
        controller.close();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let sseBuffer = '';
      let timedOut = false;
      let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

      const resetInactivityTimer = () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          timedOut = true;
          const error = new Error(`Stream inactivity timeout (${inactivityTimeoutMs}ms)`);
          logger.error('SSE stream inactivity timeout');
          try {
            controller.enqueue(encoder.encode('\n[ERROR]'));
          } catch (enqueueError) {
            logger.warn('Failed to enqueue error marker', { error: enqueueError });
          }
          safeResolve({ error });
          reader.cancel().catch(() => {});
          safeClose(controller);
        }, inactivityTimeoutMs);
      };

      resetInactivityTimer();

      try {
        while (true) {
          const { done: readerDone, value } = await reader.read();
          if (readerDone) {
            if (inactivityTimer) clearTimeout(inactivityTimer);
            break;
          }

          resetInactivityTimer();
          sseBuffer += decoder.decode(value, { stream: true });

          const lines = sseBuffer.split('\n');
          sseBuffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data:')) continue;

            const json = line.slice(5).trim();
            if (json === '[DONE]') continue;

            try {
              const parsed = JSON.parse(json);

              if (parsed.error) {
                const error = new Error(parsed.error.message || 'LLM stream error');
                logger.error('SSE stream error payload', { error: parsed.error });
                controller.enqueue(encoder.encode('\n[ERROR]'));
                if (inactivityTimer) clearTimeout(inactivityTimer);
                safeResolve({ error });
                controller.close();
                return;
              }

              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                accumulated += token;
                onToken?.(token);
                controller.enqueue(encoder.encode(token));
              }
            } catch (parseError) {
              logger.warn('Failed to parse SSE chunk', { error: parseError });
            }
          }
        }

        if (inactivityTimer) clearTimeout(inactivityTimer);
        if (!timedOut) {
          safeResolve({ error: null });
          safeClose(controller);
        }
      } catch (error) {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        if (!timedOut) {
          logger.error('SSE stream read error', { error });
          try {
            controller.enqueue(encoder.encode('\n[ERROR]'));
          } catch (enqueueError) {
            logger.warn('Failed to enqueue error marker', { error: enqueueError });
          }
          safeResolve({ error: error instanceof Error ? error : new Error(String(error)) });
          safeClose(controller);
        }
      }
    },
  });

  return {
    readable,
    accumulated: () => accumulated,
    done,
  };
};
