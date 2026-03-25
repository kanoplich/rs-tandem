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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {STATS_CARDS.map(({ key, title, icon: Icon }) => {
        const value = statsMap[key];

        return (
          <Card key={key} className="w-73.5 max-w-full h-38 p-6 text-center md:text-left">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-primary" />}
              <div className="text-sm text-muted-foreground">{title}</div>
            </div>

            <div
              className={`text-2xl font-bold mt-2 pt-2 ${colorMap[key] || 'text-light'}`}
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
