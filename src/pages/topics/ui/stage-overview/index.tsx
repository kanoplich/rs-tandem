import React from 'react';

import { OVERVIEW_TEXT } from '../../locales';

import { Progress } from '@/shared';

interface StageOverviewProps {
  title: string;
  completedTopics: number;
  totalTopics: number;
}

export const StageOverview: React.FC<StageOverviewProps> = ({
  title,
  completedTopics,
  totalTopics,
}) => {
  const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-light">{title}</h3>

        <div className="text-right">
          <div className="text-4xl font-bold text-primary">{percent}%</div>
          <div className="text-sm text-foreground mt-1">
            {completedTopics}/{totalTopics} {OVERVIEW_TEXT.TOPICS}
          </div>
        </div>
      </div>

      <Progress value={percent} />
    </div>
  );
};
