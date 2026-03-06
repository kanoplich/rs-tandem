export interface JudgeResult {
  score: number;
  maxScore: number;
  coveredPoints: string[];
  missedPoints: string[];
  feedback: string;
  judgeLevel: JudgeLevel;
}

export const JUDGE_LEVEL = {
  KEYWORD: 0,
  LLM: 1,
  ADVANCED: 2,
} as const;

export type JudgeLevel = (typeof JUDGE_LEVEL)[keyof typeof JUDGE_LEVEL];
