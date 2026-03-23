import { STAGES } from './constants';
import { getProgressPercent } from './get-progress-percent';
import { isTopicCompleted } from './is-topic-completed';

import type { TopicProgress } from '@/shared/api/dashboard/types';

export interface StageInfo {
  stage: number;
  topics: TopicProgress[];
  completedTopics: number;
  totalTopics: number;
  percent: number;
  avgScore: number;
}

export const groupByStage = (progress: TopicProgress[]): StageInfo[] => {
  return STAGES.map(({ id }) => {
    const topics = progress.filter((t) => t.stage === id);

    const completedTopics = topics.filter(isTopicCompleted).length;
    const totalTopics = topics.length;

    const percent = getProgressPercent(completedTopics, totalTopics);

    const withAttempts = topics.filter((t) => t.completed > 0);

    const avgScore =
      withAttempts.length > 0
        ? Math.round(withAttempts.reduce((sum, t) => sum + t.avgScore, 0) / withAttempts.length)
        : 0;

    return {
      stage: id,
      topics,
      completedTopics,
      totalTopics,
      percent,
      avgScore,
    };
  });
};
