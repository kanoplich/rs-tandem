import { TOPICS_OVERVIEW_TEXT } from '../../locales';
import { TopicCard } from '../topics-card';

import type { TopicProgress } from '@/shared/api';

interface TopicGridProps {
  topics: TopicProgress[];
  selectedTopicIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const TopicGrid = ({ topics, selectedTopicIds, onSelectionChange }: TopicGridProps) => {
  const handleTopicSelect = (topicId: string, selected: boolean) => {
    const newSelected = selected
      ? [...selectedTopicIds, topicId]
      : selectedTopicIds.filter((id) => id !== topicId);
    onSelectionChange(newSelected);
  };

  if (topics.length === 0) {
    return <p className="text-center text-muted-foreground">{TOPICS_OVERVIEW_TEXT.ABSENCE}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {topics.map((topic) => (
        <TopicCard
          key={topic.topicId}
          topic={topic}
          checked={selectedTopicIds.includes(topic.topicId)}
          onCheckedChange={(checked) => handleTopicSelect(topic.topicId, checked)}
        />
      ))}
    </div>
  );
};
