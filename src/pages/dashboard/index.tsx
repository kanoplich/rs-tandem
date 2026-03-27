import { useDashboardData } from './hooks/use-dashboard-data';
import { DashboardHeader, OverallStats, StageCards, StartButton } from './ui';

import { Loader } from '@/shared';

export const Dashboard = () => {
  const { topicProgress, isLoading } = useDashboardData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col px-4 py-8">
      <DashboardHeader />
      <OverallStats topicProgress={topicProgress} />
      <StartButton />
      <StageCards topicProgress={topicProgress} />
    </div>
  );
};
