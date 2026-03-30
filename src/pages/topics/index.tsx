import { useMemo, useState } from 'react';

import { useTopicsData } from './hooks/use-topics-data';
import { TopicsHeader, StageTabs } from './ui';

import { groupByStage, Loader } from '@/shared';

export const Topics = () => {
  const { topics, progress, isLoading } = useTopicsData();
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  const groupedTopics = useMemo(() => groupByStage(topics), [topics]);
  const groupedProgress = useMemo(() => groupByStage(progress), [progress]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <TopicsHeader />
      <StageTabs
        groupedTopics={groupedTopics}
        groupedProgress={groupedProgress}
        selectedTopicIds={selectedTopicIds}
        onSelectionChange={setSelectedTopicIds}
      />
    </div>
  );
};
