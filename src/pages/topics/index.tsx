import { useMemo } from 'react';

import { useTopicsData } from './hooks/use-topics-data';
import { TopicsHeader, StageTabs } from './ui';

import { groupByStage } from '@/shared';
import { Loader } from '@/shared';

export const Topics = () => {
  const { topics, isLoading } = useTopicsData();

  const groupedByStage = useMemo(() => groupByStage(topics), [topics]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <TopicsHeader />
      <StageTabs groupedByStage={groupedByStage} />
    </div>
  );
};
