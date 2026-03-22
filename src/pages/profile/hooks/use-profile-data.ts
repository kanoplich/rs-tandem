import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PROFILE_TEXT } from '../locales';

import { getProgressPercent, STAGES } from '@/shared';
import {
  getDashboardStats,
  getTopicProgress,
  type UserStats,
  type TopicProgress,
} from '@/shared/api';
import { formatScore } from '@/shared/lib/format-score';
import { isTopicCompleted } from '@/shared/lib/is-topic-completed';

type StageProgress = {
  stage: number;
  completed: number;
  total: number;
  percent: number;
};

type UseProfileDataResult = {
  loading: boolean;
  stats: UserStats | null;
  topicProgress: TopicProgress[];
  avgScore: string;
  stageProgress: StageProgress[];
};

export const useProfileData = (): UseProfileDataResult => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [avgScore, setAvgScore] = useState('0.0');
  const [stageProgress, setStageProgress] = useState<StageProgress[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [statsData, progressData] = await Promise.all([
          getDashboardStats(),
          getTopicProgress(),
        ]);

        setStats(statsData);
        setTopicProgress(progressData);

        const totalScore = progressData.reduce((sum, topic) => sum + (topic.avgScore ?? 0), 0);
        const avg = progressData.length > 0 ? totalScore / progressData.length : 0;
        setAvgScore(formatScore(avg));

        const stages = STAGES.map((stage) => stage.id);
        const stageData: StageProgress[] = stages.map((stage) => {
          const topics = progressData.filter((t) => t.stage === stage);
          const completed = topics.filter(isTopicCompleted).length;
          const total = topics.length;

          return {
            stage,
            completed,
            total,
            percent: getProgressPercent(completed, total),
          };
        });

        setStageProgress(stageData);
      } catch (e: unknown) {
        toast.error(e instanceof Error ? e.message : PROFILE_TEXT.LOAD_ERROR);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    stats,
    topicProgress,
    avgScore,
    stageProgress,
  };
};
