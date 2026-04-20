import type { ModelConfig } from '../types.ts';

import { BaseLLMProvider } from './base.ts';

const OPENROUTER_DEFAULTS: ModelConfig = {
  provider: 'openrouter',
  model: 'anthropic/claude-3.5-haiku',
  apiKeyEnvVar: 'OPENROUTER_API_KEY',
  baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
  maxRetries: 3,
  timeoutMs: 30_000,
};

export class OpenRouterProvider extends BaseLLMProvider {
  constructor(overrides?: Partial<ModelConfig>) {
    super({ ...OPENROUTER_DEFAULTS, ...overrides });
  }

  protected override getHeaders(): Record<string, string> {
    return {
      ...super.getHeaders(),
      'HTTP-Referer': Deno.env.get('OPENROUTER_REFERER') || 'https://rs-tandem.app',
      'X-Title': 'RS Tandem',
    };
  }
}
