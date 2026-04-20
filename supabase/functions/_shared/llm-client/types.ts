export type ProviderName = 'groq' | 'openrouter';

export type LLMPurpose = 'chat' | 'judge_feedback' | 'judge_scoring';

export interface ModelConfig {
  provider: ProviderName;
  model: string;
  fallbackModel?: string;
  apiKeyEnvVar: string;
  baseUrl: string;
  maxRetries: number;
  timeoutMs: number;
}

export interface LLMChatRequest {
  messages: Array<{ role: 'system' | 'user' | 'assistant' | 'tool'; content: string }>;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  tools?: unknown[];
  toolChoice?: unknown;
}

export interface LLMChatResponse {
  content: string | null;
  toolCalls?: Array<{ name: string; arguments: string }>;
  finishReason: string;
}

export interface LLMStreamResult {
  readable: ReadableStream<Uint8Array>;
  accumulated: () => string;
  done: Promise<{ error: Error | null }>;
}

export interface LLMProvider {
  chat(request: LLMChatRequest): Promise<LLMChatResponse>;
  chatStream(request: LLMChatRequest): Promise<LLMStreamResult>;
}
