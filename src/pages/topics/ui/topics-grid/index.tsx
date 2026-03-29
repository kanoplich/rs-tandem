import { TopicCard } from '../index';

import type { TopicProgress } from '@/shared/api';

interface TopicGridProps {
  topics: TopicProgress[];
  selectedTopicIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const TopicGrid = ({ topics, selectedTopicIds, onSelectionChange }: TopicGridProps) => {
  const stagesMap = new Map<number, TopicProgress[]>();
  topics.forEach((topic) => {
    if (!stagesMap.has(topic.stage)) stagesMap.set(topic.stage, []);
    stagesMap.get(topic.stage)!.push(topic);
  });

  const handleTopicSelect = (topicId: string, selected: boolean) => {
    const newSelected = selected
      ? [...selectedTopicIds, topicId]
      : selectedTopicIds.filter((id) => id !== topicId);
    onSelectionChange(newSelected);
  };

  return (
    <div className="space-y-8">
      {Array.from(stagesMap.entries()).map(([stageId, stageTopics]) => (
        <div key={stageId} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {stageTopics.map((topic) => (
            <TopicCard
              key={topic.topicId}
              topic={topic}
              checked={selectedTopicIds.includes(topic.topicId)}
              onCheckedChange={(checked) => handleTopicSelect(topic.topicId, checked)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
