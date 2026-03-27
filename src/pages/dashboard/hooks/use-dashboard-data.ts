import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { DASHBOARD_ERRORS } from '../locales';

import { getTopicProgress, type TopicProgress } from '@/shared/api';

type UseDashboardDataResult = {
  topicProgress: TopicProgress[];
  isLoading: boolean;
};

export const useDashboardData = (): UseDashboardDataResult => {
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopicProgress();
        setTopicProgress(data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : DASHBOARD_ERRORS.TOPICS_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return { topicProgress, isLoading };
};
