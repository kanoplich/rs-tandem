import { getModelConfig } from './config.ts';
import { GroqProvider } from './providers/groq.ts';
import { OpenRouterProvider } from './providers/openrouter.ts';
import type { LLMProvider, LLMPurpose } from './types.ts';

export const getClient = (purpose: LLMPurpose): LLMProvider => {
  const config = getModelConfig(purpose);

  switch (config.provider) {
    case 'groq':
      return new GroqProvider(config);
    case 'openrouter':
      return new OpenRouterProvider(config);
    default:
      throw new Error(`Unknown LLM provider: ${config.provider}`);
  }
};
