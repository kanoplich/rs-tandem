import type { Submission } from '@/shared/api';

interface StageStatsItem {
  stage: number;
  total: number;
  avgScore: number;
}

export const getStageStats = (grouped: Record<number, Submission[]>): StageStatsItem[] => {
  return Object.entries(grouped).map(([stage, items]) => {
    const total = items.length;

    const avgScore =
      total > 0 ? items.reduce((sum, item) => sum + item.result.score, 0) / total : 0;

    return {
      stage: Number(stage),
      total,
      avgScore,
    };
  });
};
