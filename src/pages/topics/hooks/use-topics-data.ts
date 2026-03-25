import { useEffect, useState, useMemo } from 'react';
import { toast } from 'sonner';

import { ERROR } from '../locales';

import { getTopics, getTopicProgress, type Topic, type TopicProgress } from '@/shared/api';

type UseTopicsDataResult = {
  topics: (Topic & Partial<TopicProgress>)[];
  isLoading: boolean;
};

export const useTopicsData = (): UseTopicsDataResult => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progress, setProgress] = useState<TopicProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsList, progressList] = await Promise.all([getTopics(), getTopicProgress()]);

        setTopics(topicsList);
        setProgress(progressList);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : ERROR.DOWNLOAD;
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mergedTopics = useMemo(() => {
    const progressMap = new Map(progress.map((p) => [p.topicId, p]));
    return topics.map((topic) => ({
      ...topic,
      ...progressMap.get(topic.id),
    }));
  }, [topics, progress]);

  return { topics: mergedTopics, isLoading };
};
