import type { TopicProgress } from '@/shared/api';

export const isTopicCompleted = (t: TopicProgress): boolean =>
  t.completed === t.total && t.total > 0;
