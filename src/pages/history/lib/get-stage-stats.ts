import type { StageStatsItem } from '../model';

import type { Submission } from '@/shared';

export const getStageStats = (grouped: Record<number, Submission[]>): StageStatsItem[] => {
  return Object.entries(grouped).map(([stage, items]) => {
    const successful = items.filter((item) => item.result.score > 70);

    const total = successful.length;

    const avg =
      total > 0 ? successful.reduce((sum, item) => sum + item.result.score, 0) / total / 10 : 0;

    return {
      stage: Number(stage),
      total,
      avg,
    };
  });
};
