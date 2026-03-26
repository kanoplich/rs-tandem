import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getTopicProgress } from '@/shared/api/dashboard';
import type { TopicProgress } from '@/shared/api/dashboard/types';
import { groupByStage, type StageInfo } from '@/shared/lib/group-by-stage';

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
        const progress: TopicProgress[] = await getTopicProgress();

        const grouped = groupByStage(progress);
        setStages(grouped);

        const mapped: Training[] = progress.map((item) => ({
          id: item.topicId,
          title: item.topicTitle,
          stage: item.stage,
          date: '',
          duration: '',
          score: Number((item.avgScore / 10).toFixed(1)),
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
