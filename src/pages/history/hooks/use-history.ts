import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getTopicProgress, type TopicProgress } from '@/shared/api';
import { groupByStage } from '@/shared';
import type { StageInfo } from '../model/types';

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

        const stageStats: StageInfo[] = Object.entries(grouped).map(([stage, items]) => {
const totalTopics = items.length;

const completedTopics = items.filter(
  (item) => item.completed > 0
).length;

const avgScore =
  items.length > 0
    ? items.reduce((sum, item) => sum + item.avgScore, 0) / items.length
    : 0;

          return {
            stage: Number(stage),
            totalTopics,
            completedTopics,
            avgScore,
          };
        });

        setStages(stageStats);

        const mapped: Training[] = progress
          .filter((item) => item.avgScore > 70)
          .map((item) => ({
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
