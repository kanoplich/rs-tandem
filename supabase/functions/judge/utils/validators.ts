import { LLMResponse } from '../types.ts';

export const isValidJudgeResponse = (value: unknown): value is LLMResponse => {
  if (!value || typeof value !== 'object') return false;

  const v = value as Record<string, unknown>;

  if (!v.points || typeof v.points !== 'object') return false;

  return Object.values(v.points as Record<string, unknown>).every(
    (score) => typeof score === 'number' && score >= 0 && score <= 2
  );
};
