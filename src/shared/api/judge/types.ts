export interface JudgeResult {
  score: number;
  maxScore: number;
  coveredPoints: string[];
  missedPoints: string[];
  feedback: string;
  judgeLevel: number;
}
