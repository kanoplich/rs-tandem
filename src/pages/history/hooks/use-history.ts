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
        const successfulSubmissions = submissions.filter((item) => item.result.score > 70);
        const grouped = groupByStage(submissions);
        const stageStats: StageInfo[] = Object.entries(grouped).map(([stage, items]) => {
          const successful = items.filter((item) => item.result.score > 70);

          const totalTopics = successful.length;

          const completedTopics = successful.length;

          const avgScore =
            successful.length > 0
              ? successful.reduce((sum, item) => sum + item.result.score / 10, 0) /
                successful.length
              : 0;

          return {
            stage: Number(stage),
            totalTopics,
            completedTopics,
            avgScore,
          };
        });

        setStages(stageStats);

        const mapped: Training[] = successfulSubmissions.map((item) => ({
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
