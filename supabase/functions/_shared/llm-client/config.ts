import type { LLMPurpose, ModelConfig, ProviderName } from './types.ts';

interface LLMPurposeConfig {
  provider: ProviderName;
  model: string;
}

const PROVIDER_URLS: Record<ProviderName, string> = {
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
};

const PROVIDER_API_KEYS: Record<ProviderName, string> = {
  groq: 'GROQ_API_KEY',
  openrouter: 'OPENROUTER_API_KEY',
};

const DEFAULTS: Record<LLMPurpose, LLMPurposeConfig> = {
  chat: {
    provider: 'openrouter',
    model: 'anthropic/claude-3.5-haiku',
  },
  judge_feedback: {
    provider: 'groq',
    model: 'llama-3.3-70b-versatile',
  },
  judge_scoring: {
    provider: 'groq',
    model: 'llama-3.3-70b-versatile',
  },
};

const ENV_PREFIX: Record<LLMPurpose, string> = {
  chat: 'LLM_CHAT',
  judge_feedback: 'LLM_JUDGE_FEEDBACK',
  judge_scoring: 'LLM_JUDGE_SCORING',
};

export const getModelConfig = (purpose: LLMPurpose): ModelConfig => {
  const prefix = ENV_PREFIX[purpose];
  const defaults = DEFAULTS[purpose];

  const VALID_PROVIDERS: Set<string> = new Set<ProviderName>(['groq', 'openrouter']);
  const rawProvider = Deno.env.get(`${prefix}_PROVIDER`) || defaults.provider;

  if (!VALID_PROVIDERS.has(rawProvider)) {
    throw new Error(
      `Invalid ${prefix}_PROVIDER value: "${rawProvider}". Expected: groq, openrouter`
    );
  }

  const provider = rawProvider as ProviderName;
  const model = Deno.env.get(`${prefix}_MODEL`) || defaults.model;
  const fallbackModel = Deno.env.get(`${prefix}_FALLBACK_MODEL`) || undefined;

  return {
    provider,
    model,
    fallbackModel,
    apiKeyEnvVar: PROVIDER_API_KEYS[provider],
    baseUrl: PROVIDER_URLS[provider],
    maxRetries: 3,
    timeoutMs: 30_000,
  };
};
