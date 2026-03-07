import type { JudgeResult } from '../judge/types';

export interface Submission {
  id: string;
  userId: string | null;
  taskId: string | null;
  answer: string;
  submittedAt: string | null;
  result: JudgeResult;
}

export interface RunResult {
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
