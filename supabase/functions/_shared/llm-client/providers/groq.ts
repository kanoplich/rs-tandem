import type { ModelConfig } from '../types.ts';

import { BaseLLMProvider } from './base.ts';

const GROQ_DEFAULTS: ModelConfig = {
  provider: 'groq',
  model: 'llama-3.3-70b-versatile',
  apiKeyEnvVar: 'GROQ_API_KEY',
  baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
  maxRetries: 3,
  timeoutMs: 30_000,
};

export class GroqProvider extends BaseLLMProvider {
  constructor(overrides?: Partial<ModelConfig>) {
    super({ ...GROQ_DEFAULTS, ...overrides });
  }
}
