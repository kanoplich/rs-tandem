import { formatScore, getProgressPercent, isTopicCompleted } from '@/shared';
import type { TopicProgress } from '@/shared/api';

type TopicStats = {
  totalCount: number;
  completedCount: number;
  progressPercent: number;
  averageScore: string;
};

export const getTopicStats = (topicsProgress: TopicProgress[]): TopicStats => {
  const completedTopics = topicsProgress.filter(isTopicCompleted);
  const completedCount = completedTopics.length;
  const totalCount = topicsProgress.length;
  const progressPercent = getProgressPercent(completedTopics.length, topicsProgress.length);

  const averageScore =
    completedTopics.length === 0
      ? '0'
      : formatScore(
          completedTopics.reduce((sum, t) => sum + t.avgScore, 0) / completedTopics.length
        );
  return { totalCount, completedCount, progressPercent, averageScore };
};
