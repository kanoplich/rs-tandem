import { useMemo } from 'react';

import { ACHIEVEMENTS } from '../lib/constants';
import { ACHIEVEMENTS_TEXT } from '../locales';

import { Card, groupByStage, isTopicCompleted } from '@/shared';
import type { TopicProgress, UserStats } from '@/shared/api';

type AchievementsCardProps = {
  stats: UserStats | null;
  progress: TopicProgress[];
};

export const AchievementsCard = ({ stats, progress }: AchievementsCardProps) => {
  const achievements = useMemo(() => {
    const completedTasks = stats?.completedTasks ?? 0;
    const totalTasks = stats?.totalTasks ?? 0;

    const grouped = groupByStage(progress);
    const stage1Topics = grouped[1] ?? [];
    const isStage1Master = stage1Topics.length > 0 && stage1Topics.every(isTopicCompleted);

    const isPerfectionist = progress.some((t) => t.avgScore === 100);

    const conditions: Record<string, boolean> = {
      first: completedTasks >= 1,
      ten: completedTasks >= 10,
      stage1: isStage1Master,
      perfect: isPerfectionist,
      expert: totalTasks > 0 && completedTasks === totalTasks,
    };

    return ACHIEVEMENTS.map((a) => ({
      ...a,
      completed: conditions[a.key],
    }));
  }, [stats, progress]);

  return (
    <Card className="p-4 sm:p-6 w-full flex flex-col">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-base sm:text-lg font-bold">{ACHIEVEMENTS_TEXT.TITLE}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{ACHIEVEMENTS_TEXT.SUBTITLE}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 justify-items-center">
        {achievements.map(({ key, title, Icon, completed }) => (
          <Card
            key={key}
            className={`
               flex items-center gap-2 justify-center p-3
               w-full min-h-[93px] rounded-lg
               ${completed ? 'border border-primary bg-primary/5' : ''}
             `}
          >
            {Icon && <Icon className="w-8 h-8 flex-shrink-0" />}
            <span className="text-sm font-medium break-words text-center">{title}</span>
          </Card>
        ))}
      </div>
    </Card>
  );
};
