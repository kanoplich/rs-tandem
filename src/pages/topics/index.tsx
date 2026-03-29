import { useMemo, useState } from 'react';

import { useTopicsData } from './hooks/use-topics-data';
import { TopicsHeader, StageTabs, TopicGrid } from './ui';

import { groupByStage, Loader, STAGES } from '@/shared';

export const Topics = () => {
  const { topics, progress, isLoading } = useTopicsData();
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [activeStage, setActiveStage] = useState<string>(() => String(STAGES[0]?.id ?? '1'));

  const groupedTopics = useMemo(() => groupByStage(topics), [topics]);
  const groupedProgress = useMemo(() => groupByStage(progress), [progress]);
  const currentStageProgress = groupedProgress[Number(activeStage)] ?? [];

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <TopicsHeader />
      <StageTabs
        groupedTopics={groupedTopics}
        groupedProgress={groupedProgress}
        value={activeStage}
        onValueChange={setActiveStage}
      />
      <TopicGrid
        topics={currentStageProgress}
        selectedTopicIds={selectedTopicIds}
        onSelectionChange={setSelectedTopicIds}
      />
    </div>
  );
};
