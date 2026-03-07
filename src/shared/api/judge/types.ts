export interface JudgeResult {
  score: number | null;
  maxScore: number;
  coveredPoints: string[] | null;
  missedPoints: string[] | null;
  feedback: string | null;
  judgeLevel: JudgeLevel | null;
}

export const JUDGE_LEVEL = {
  KEYWORD: 0,
  LLM: 1,
  ADVANCED: 2,
} as const;

export type JudgeLevel = (typeof JUDGE_LEVEL)[keyof typeof JUDGE_LEVEL];
