import { formatScore, getProgressPercent, isTopicCompleted } from '@/shared';
import type { TopicProgress } from '@/shared/api';

export const getTopicStats = (topics: TopicProgress[]) => {
  const topicsCount = topics.length;

  const completedTopics = topics.filter(isTopicCompleted);
  const completedCount = completedTopics.length;

  const progress = getProgressPercent(completedTopics.length, topics.length);

  const scoredTopics = topics.filter((t) => t.completed > 0);
  const averageScore =
    scoredTopics.length === 0
      ? 0
      : Number(
          formatScore(scoredTopics.reduce((sum, t) => sum + t.avgScore, 0) / scoredTopics.length)
        );

  return { topicsCount, completedCount, progress, averageScore };
};
