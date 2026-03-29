import { useMemo } from 'react';

import { useHistory } from './hooks';
import { getStageStats } from './lib/get-stage-stats';
import { HISTORY_PAGE_TEXT } from './locales';
import { HistoryList, HistoryStats, StageStats } from './ui';

import { Loader, groupByStage, formatScore } from '@/shared';

export const History = () => {
  const { submissions, isLoading } = useHistory();

  const grouped = useMemo(() => groupByStage(submissions), [submissions]);

  const stageStats = useMemo(() => getStageStats(grouped), [grouped]);

  const total = submissions.length;

  const avg = useMemo(() => {
    if (total === 0) return '0';

    const value = submissions.reduce((sum, s) => sum + s.result.score, 0) / total;

    return formatScore(value);
  }, [submissions, total]);

  const best = useMemo(() => {
    if (total === 0) return formatScore(0);

    return formatScore(Math.max(...submissions.map((s) => s.result.score)));
  }, [submissions, total]);

  if (isLoading) return <Loader />;
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>{HISTORY_PAGE_TEXT.HEADER.TITLE}</h1>
        <p className="text-muted-foreground">{HISTORY_PAGE_TEXT.HEADER.DESCRIPTION}</p>
      </div>

      <HistoryStats total={total} avg={avg} best={best} />

      <HistoryList items={submissions} />

      <StageStats items={stageStats} />
    </div>
  );
};
