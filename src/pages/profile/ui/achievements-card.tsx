import { useMemo } from 'react';

import { ACHIEVEMENTS } from '../lib/constants';
import { ACHIEVEMENTS_TEXT } from '../locales';

import { Card, DEFAULT_MAX_SCORE, isTopicCompleted, STAGES } from '@/shared';
import type { TopicProgress, UserStats } from '@/shared/api';

type AchievementsCardProps = {
  stats: UserStats | null;
  progress: TopicProgress[];
};

export const AchievementsCard = ({ stats, progress = [] }: AchievementsCardProps) => {
  const achievements = useMemo(() => {
    const completedTasks = stats?.completedTasks ?? 0;

    const isStageMaster = STAGES.some((stage) => {
      const stageTopics = progress.filter((t) => t.stage === stage.id);
      return stageTopics.length > 0 && stageTopics.every(isTopicCompleted);
    });

    const isPerfectionist = progress.some(
      (topic) => isTopicCompleted(topic) && topic.avgScore === DEFAULT_MAX_SCORE
    );

    const isExpert = progress.length > 0 && progress.every(isTopicCompleted);

    return ACHIEVEMENTS.map((achievement) => {
      let completed = false;

      switch (achievement.key) {
        case 'first':
          completed = completedTasks >= 1;
          break;
        case 'ten':
          completed = completedTasks >= 10;
          break;
        case 'stage':
          completed = isStageMaster;
          break;
        case 'perfect':
          completed = isPerfectionist;
          break;
        case 'expert':
          completed = isExpert;
          break;
      }

      return { ...achievement, completed };
    });
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
               ${completed ? 'border border-primary bg-primary/5 text-light' : ''}
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
