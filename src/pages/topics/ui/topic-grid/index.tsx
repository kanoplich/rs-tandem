import { TOPIC_OVERVIEW_TEXT } from '../../locales';
import { TopicCard } from '../topic-card';

import type { Topic, TopicProgress } from '@/shared/api';

interface TopicGridProps {
  topics: Topic[];
  progress: TopicProgress[];
  selectedTopicIds: Set<string>;
  onTopicToggle: (topicId: string, checked: boolean) => void;
  onContinue: (topicId: string) => void;
  onRestart: (topicId: string) => void;
}

export const TopicGrid = ({
  topics,
  progress,
  selectedTopicIds,
  onTopicToggle,
  onContinue,
  onRestart,
}: TopicGridProps) => {
  const progressByTopicId = new Map(progress.map((p) => [p.topicId, p]));

  if (topics.length === 0) {
    return <p className="text-center text-muted-foreground">{TOPIC_OVERVIEW_TEXT.ABSENCE}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          progress={progressByTopicId.get(topic.id)}
          checked={selectedTopicIds.has(topic.id)}
          onCheckedChange={(checked) => onTopicToggle(topic.id, checked)}
          onContinue={onContinue}
          onRestart={onRestart}
        />
      ))}
    </div>
  );
};
