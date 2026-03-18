export const DIFFICULTY = {
  EASY: 1,
  MEDIUM: 2,
  NORMAL: 3,
  HARD: 4,
  EXTREME: 5,
} as const;

export const TASK_TYPE = {
  THEORY_OPEN: 'theory_open',
  THEORY_CHOICE: 'theory_choice',
  CODING: 'coding',
} as const;

export type DifficultyLevel = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];
export type TaskType = (typeof TASK_TYPE)[keyof typeof TASK_TYPE];
export interface Task {
  id: string;
  topicId: string;
  type: TaskType;
  difficulty: DifficultyLevel;
  title: string;
  questionText: string;
  codeTemplate?: string;
  testCode?: string;
  rubricItems: string[];
  maxScore: number;
}
