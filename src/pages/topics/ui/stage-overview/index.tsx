import { TOPICS_OVERVIEW_TEXT } from '../../locales';

import { STAGES } from '@/shared';
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

  return (
    <div className="bg-card rounded-xl border p-6 border-border">
      <div className="flex items-start justify-between mb-4">
        <h3>{stage.title}</h3>
      </div>
    </div>
  );
};
