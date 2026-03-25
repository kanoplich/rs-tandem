import { useProfileStats } from '../hooks';
import { STATS_CARDS } from '../lib/constants';

import { Card } from '@/shared';

export const StatsCards = () => {
  const { completedTasks, avgScore, rank, xp, isLoading } = useProfileStats();
  const statsMap = { completedTasks, avgScore, rank, xp };

  const colorMap: Record<string, string> = {
    avgScore: 'text-primary',
    rank: 'text-success',
    completedTasks: 'text-light',
    xp: 'text-light',
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS_CARDS.map(({ key, title, icon: Icon }) => {
        const value = statsMap[key];

        return (
          <Card
            key={key}
            className="w-full min-h-[150px] p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          >
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 w-full">
              {Icon && <Icon className="w-6 h-6 text-primary" />}
              <div className="text-sm text-muted-foreground">{title}</div>
            </div>

            <div
              className={`text-2xl font-bold mt-2 ${colorMap[key] || 'text-light'}`}
              aria-label={`${title}: ${isLoading ? 'loading' : value}`}
            >
              {isLoading ? '—' : value}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
