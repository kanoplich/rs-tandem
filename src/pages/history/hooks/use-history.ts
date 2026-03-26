import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { StageInfo } from '../model/types';

import { groupByStage } from '@/shared';
import { getSubmissionHistory } from '@/shared/api/submissions';

export interface Training {
  id: string;
  title: string;
  stage: number;
  date: string;
  duration: string;
  score: number;
}

export const useHistory = () => {
  const [stages, setStages] = useState<StageInfo[]>([]);
  const [history, setHistory] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const submissions = await getSubmissionHistory();
        const grouped = groupByStage(submissions);
        const stageStats: StageInfo[] = Object.entries(grouped).map(([stage, items]) => {
          const successful = items.filter((item) => item.result.score > 70);

          const totalTopics = items.length;

          const completedTopics = successful.length;

          const avgScore =
            items.length > 0
              ? items.reduce((sum, item) => sum + item.result.score / 10, 0) / items.length
              : 0;

          return {
            stage: Number(stage),
            totalTopics,
            completedTopics,
            avgScore,
          };
        });

        setStages(stageStats);

        const mapped: Training[] = submissions
          .filter((item) => item.result.score > 70)
          .map((item) => ({
            id: item.id,
            title: item.title,
            stage: item.stage,
            date: item.submittedAt,
            duration: '',
            score: Number((item.result.score / 10).toFixed(1)),
          }));

        setHistory(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка загрузки истории';

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { stages, history, isLoading };
};
