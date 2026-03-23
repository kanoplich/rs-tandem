import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ERROR } from '../locales';

import { groupByStage } from '@/shared';
import {
  getTopics,
  getTopicProgress,
  type Topic,
  type TopicProgress,
  type TopicWithProgress,
} from '@/shared/api';

export const useTopicsData = () => {
  const [topics, setTopics] = useState<TopicWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsList, progressList] = await Promise.all([getTopics(), getTopicProgress()]);

        const progressMap = new Map(progressList.map((p: TopicProgress) => [p.topicId, p]));

        const merged: TopicWithProgress[] = topicsList.map((topic: Topic) => {
          const progress = progressMap.get(topic.id);
          return {
            ...topic,
            completed: progress?.completed ?? 0,
            total: progress?.total ?? topic.taskCount ?? 0,
            avgScore: progress?.avgScore ?? 0,
            lastAttemptAt: progress?.lastAttemptAt,
          };
        });

        setTopics(merged);
        setError(null);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : [ERROR.DOWNLOAD]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedByStage = groupByStage(topics);

  return { groupedByStage, isLoading, error };
};
