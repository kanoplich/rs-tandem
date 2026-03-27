import { formatScore, getProgressPercent, isTopicCompleted } from '@/shared';
import type { TopicProgress } from '@/shared/api';

export const getTopicStats = (topics: TopicProgress[]) => {
  const completedTopics: TopicProgress[] = [];
  let scoreSum = 0;
  let scoredCount = 0;

  for (const t of topics) {
    if (isTopicCompleted(t)) {
      completedTopics.push(t);
    }

    if (t.completed > 0) {
      scoreSum += t.avgScore;
      scoredCount++;
    }
  }

  const progress = getProgressPercent(completedTopics.length, topics.length);

  const averageScore = scoredCount > 0 ? Number(formatScore(scoreSum / scoredCount)) : 0;

  return { completedTopics, progress, averageScore };
};
