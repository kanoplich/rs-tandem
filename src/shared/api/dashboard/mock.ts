import { MOCK_TASKS } from '../task/mock';
import { MOCK_TOPICS } from '../topic/mock';

import type { TopicProgress, UserStats } from './types';

export const MOCK_USER_STATS: UserStats = {
  xp: 340,
  streak: 4,
  completedTasks: 2,
  totalTasks: MOCK_TASKS.length,
  rank: 'Junior',
};

export const MOCK_TOPIC_PROGRESS: TopicProgress[] = MOCK_TOPICS.map((t) => ({
  topicId: t.id,
  topicTitle: t.title,
  completed: t.id === 'closures' ? 1 : t.id === 'event-loop' ? 1 : 0,
  total: t.taskCount,
  avgScore: t.id === 'closures' ? 85 : t.id === 'event-loop' ? 30 : 0,
  stage: 1,
  lastAttemptAt:
    t.id === 'closures'
      ? new Date(Date.now() - 86400000).toISOString()
      : t.id === 'event-loop'
        ? new Date(Date.now() - 3600000).toISOString()
        : '',
}));
