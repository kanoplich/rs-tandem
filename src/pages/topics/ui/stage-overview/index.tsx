import { TOPICS_OVERVIEW_TEXT } from '../../locales';

import { STAGES, getProgressPercent, isTopicCompleted, Progress } from '@/shared';
import type { TopicProgress } from '@/shared/api';

interface StageOverviewProps {
  stageId: number;
  totalTopics: number;
  progress: TopicProgress[];
}

export const StageOverview = ({ stageId, totalTopics, progress }: StageOverviewProps) => {
  const stage = STAGES.find((stage) => stage.id === stageId);
  if (!stage) return null;
  if (totalTopics === 0)
    return <p className="text-center text-muted-foreground">{TOPICS_OVERVIEW_TEXT.ABSENCE}</p>;

  const completedTopics = progress.filter(isTopicCompleted).length;
  const percent = getProgressPercent(completedTopics, totalTopics);

  return (
    <div className="bg-card rounded-xl border p-6 border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-light">{stage.title}</p>
          <p>{stage.description}</p>
        </div>
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
