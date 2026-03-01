export type TaskType = 'theory_open' | 'theory_choice' | 'coding';

export interface Task {
  id: string;
  topicId: string;
  type: TaskType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  title: string;
  questionText: string;
  codeTemplate?: string;
  testCode?: string;
  rubricItems: string[];
  maxScore: number;
}

export interface TaskSecret {
  taskId: string;
  goldenAnswer: string;
  rubricWeights: number[];
  hints: string[];
}
