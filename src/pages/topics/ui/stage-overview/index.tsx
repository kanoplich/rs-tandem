import { TOPICS_OVERVIEW_TEXT } from '../../locales';

import { STAGES, getProgressPercent, Progress } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageOverviewProps {
  stageId: number;
  topics: (Topic & Partial<TopicProgress>)[];
}

export const StageOverview = ({ stageId, topics }: StageOverviewProps) => {
  const stage = STAGES.find((stage) => stage.id === stageId);
  if (!stage) return null;
  if (topics.length === 0)
    return <p className="text-center text-muted-foreground">{TOPICS_OVERVIEW_TEXT.ABSENCE}</p>;

  const totalTopics = topics.length;
  const completedTopics = topics.filter((topic) => {
    const { completed, total } = topic;
    return total !== undefined && completed !== undefined && completed === total && total > 0;
  }).length;
  const percent = getProgressPercent(completedTopics, totalTopics);

  return (
    <div className="bg-card rounded-xl border p-6 border-border">
      <div className="flex items-start justify-between mb-4">
        <h3>{stage.title}</h3>
        <div className="text-right">
          <div className="text-4xl font-bold text-primary">{percent}%</div>
          <div className="text-sm text-foreground mt-1">
            {completedTopics}/{totalTopics}
          </div>
        </div>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  );
};
