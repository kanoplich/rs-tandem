import { STAGES } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageOverviewProps {
  stageId: number;
  topics: (Topic & Partial<TopicProgress>)[];
}

export const StageOverview = ({ stageId, topics }: StageOverviewProps) => {
  const stage = STAGES.find((stage) => stage.id === stageId);
  if (!stage) return null;

  return (
    <div className="bg-card rounded-xl p-6 border border-border" data-topics-count={topics.length}>
      <div className="flex items-start justify-between mb-4">
        <h3>{stage.title}</h3>
      </div>
    </div>
  );
};
