import { MOCK_JUDGE_RESULT_POOR, MOCK_JUDGE_RESULT_GOOD } from '../judge/mock';

import type { Submission } from './types';

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    userId: 'user-mock-01',
    taskId: 'closures-1',
    answer:
      'Замыкание — это функция, которая запоминает своё лексическое окружение даже после завершения внешней функции.',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    result: MOCK_JUDGE_RESULT_GOOD,
    taskTitle: 'Closures',
    title: 'Closures',
    stage: 1,
  },
  {
    id: 'sub-002',
    userId: 'user-mock-01',
    taskId: 'event-loop-1',
    answer: 'Event loop следит за call stack и очередями задач.',
    submittedAt: new Date(Date.now() - 3600000).toISOString(),
    result: MOCK_JUDGE_RESULT_POOR,
    taskTitle: 'Event Loop',
    title: 'Event loop',
    stage: 3,
  },
];
