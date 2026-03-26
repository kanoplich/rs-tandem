import { useMemo } from 'react';

import { STATS_CARDS } from '../lib/constants';

import { Card } from '@/shared';
import type { TopicProgress, UserStats } from '@/shared/api';

type StatsCardsProps = {
  stats: UserStats | null;
  progress: TopicProgress[];
};

export const StatsCards = ({ stats, progress = [] }: StatsCardsProps) => {
  const computedStats = useMemo(
    () => ({
      completedTasks: stats?.completedTasks ?? 0,
      avgScore:
        progress.length > 0
          ? (progress.reduce((acc, item) => acc + item.avgScore, 0) / progress.length).toFixed(1)
          : 0,
      rank: stats?.rank ?? '—',
      xp: stats?.xp ?? 0,
    }),
    [stats, progress]
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
