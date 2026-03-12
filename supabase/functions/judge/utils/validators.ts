import { LLMResponse } from '../types.ts';

export const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
};

export const isValidJudgeResponse = (value: unknown): value is LLMResponse => {
  if (!value || typeof value !== 'object') return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.score === 'number' &&
    isStringArray(v.covered_points) &&
    isStringArray(v.missed_points) &&
    typeof v.feedback === 'string'
  );
};
