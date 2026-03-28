import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getStageStats } from '../lib/get-stage-stats';
import { HISTORY_PAGE_TEXT } from '../locales';
import type { HistoryItem, StageStatsItem } from '../model';

import { groupByStage, getSubmissionHistory } from '@/shared';

export const useHistory = () => {
  const [stages, setStages] = useState<StageStatsItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const submissions = await getSubmissionHistory();
        const successfulSubmissions = submissions.filter((item) => item.result.score > 70);
        const grouped = groupByStage(successfulSubmissions);
        const stageStats = getStageStats(grouped);

        setStages(stageStats);

        const mapped: HistoryItem[] = successfulSubmissions.map((item) => ({
          id: item.id,
          title: item.title,
          stage: item.stage,
          date: item.submittedAt,
          score: Number((item.result.score / 10).toFixed(1)),
        }));

        setHistory(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : HISTORY_PAGE_TEXT.ERROR.LOAD;

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const total = stages.reduce((sum, s) => sum + s.total, 0);

  const totalAttempts = history.length;

  const totalScore = stages.reduce((sum, s) => sum + s.avg * s.total, 0);

  const avg = totalAttempts > 0 ? Number((totalScore / totalAttempts).toFixed(1)) : 0;

  const best = history.length > 0 ? Math.max(...history.map((item) => item.score)) : 0;

  return { stages, history, isLoading, total, avg, best };
};
