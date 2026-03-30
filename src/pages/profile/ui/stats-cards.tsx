import { useMemo } from 'react';

import { STATS_CARDS } from '../lib/constants';

import { Card, getTopicStats } from '@/shared';
import type { TopicProgress, UserStats } from '@/shared/api';
import { MAX_DISPLAY_SCORE } from '@/shared/lib/constants';

type StatsCardsProps = {
  stats: UserStats | null;
  progress: TopicProgress[];
};

export const StatsCards = ({ stats, progress = [] }: StatsCardsProps) => {
  const { averageScore } = useMemo(() => getTopicStats(progress), [progress]);

  const computedStats = useMemo(
    () => ({
      completedTasks: stats?.completedTasks ?? 0,
      avgScore: `${averageScore}/${MAX_DISPLAY_SCORE}`,
      rank: stats?.rank ?? '—',
      xp: stats?.xp ?? 0,
    }),
    [stats, averageScore]
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
      {STATS_CARDS.map(({ key, title, icon: Icon, color }) => (
        <Card
          key={key}
          className="w-full min-h-[150px] p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left"
        >
          <div className="flex flex-col items-center md:flex-row md:items-center gap-2 w-full">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>
          <div className={`text-2xl font-bold mt-2 ${color || 'text-light'}`}>
            {computedStats[key]}
          </div>
        </Card>
      ))}
    </div>
  );
};
