import { DashboardHeader } from './ui/dashboard-header';
import { OverallStats } from './ui/overall-stats';
import { StageCards } from './ui/stage-cards';
import { StartButton } from './ui/start-button';

import { Loader } from '@/shared';

export const Dashboard = () => {
  const isLoading = false;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col px-4 py-8">
      <DashboardHeader />
      <OverallStats />
      <StartButton />
      <StageCards />
    </div>
  );
};
