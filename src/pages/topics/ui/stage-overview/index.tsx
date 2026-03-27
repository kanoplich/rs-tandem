import { TOPICS_OVERVIEW_TEXT } from '../../locales';

import { STAGES, getProgressPercent, Progress } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';
import { isTopicCompleted } from '@/shared/lib/is-topic-completed';

interface StageOverviewProps {
  stageId: number;
  topics: Topic[];
  progress: TopicProgress[];
}

export const StageOverview = ({ stageId, topics, progress }: StageOverviewProps) => {
  const stage = STAGES.find((stage) => stage.id === stageId);
  if (!stage) return null;
  if (topics.length === 0)
    return <p className="text-center text-muted-foreground">{TOPICS_OVERVIEW_TEXT.ABSENCE}</p>;

  const totalTopics = topics.length;
  const topicIds = new Set(topics.map((t) => t.id));

  const completedTopics = progress.filter(
    (p) => topicIds.has(p.topicId) && isTopicCompleted(p)
  ).length;
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
