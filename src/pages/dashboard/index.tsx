import { DashboardHeader, OverallStats, StageCards, StartButton } from './ui';

export const Dashboard = () => {
  return (
    <div className="flex flex-col px-4 py-8">
      <DashboardHeader />
      <OverallStats />
      <StartButton />
      <StageCards />
    </div>
  );
};
