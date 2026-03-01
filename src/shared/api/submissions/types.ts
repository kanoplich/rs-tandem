export interface Submission {
  id: string;
  userId: string;
  taskId: string;
  answer: string;
  submittedAt: string;
  // result: JudgeResult;
}

interface JudgeResult {
  score: number;
  maxScore: number;
  coveredPoints: string[];
  missedPoints: string[];
  feedback: string;
  judgeLevel: 0 | 1 | 2;
}

interface RunResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  testDetails: TestDetail[];
  stderr?: string;
  executionTimeMs: number;
}

interface TestDetail {
  name: string;
  passed: boolean;
  error?: string;
}
