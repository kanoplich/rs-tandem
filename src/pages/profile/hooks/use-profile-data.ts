import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PROFILE_TEXT } from '../locales';

import {
  getDashboardStats,
  getTopicProgress,
  type UserStats,
  type TopicProgress,
} from '@/shared/api';

type UseProfileDataResult = {
  isLoading: boolean;
  stats: UserStats | null;
  progress: TopicProgress[];
};

export const useProfileData = (): UseProfileDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [progress, setProgress] = useState<TopicProgress[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, progressData] = await Promise.all([
          getDashboardStats(),
          getTopicProgress(),
        ]);

        setStats(statsData);
        setProgress(progressData);
      } catch (e: unknown) {
        toast.error(e instanceof Error ? e.message : PROFILE_TEXT.LOAD_ERROR);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    stats,
    progress,
  };
};
