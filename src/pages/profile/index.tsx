import { useMemo } from 'react';

import { useProfileData } from './hooks';
import { AchievementsCard, ProfileHeader, StageProgressCard, StatsCards } from './ui';

import { groupByStage, isTopicCompleted, Loader, STAGES } from '@/shared';

export const Profile = () => {
  const { stats, progress, isLoading } = useProfileData();

  const grouped = useMemo(() => groupByStage(progress), [progress]);

  const stageBadges = useMemo(
    () =>
      STAGES.map((stage) => {
        const topics = grouped[stage.id] ?? [];
        return {
          title: stage.title,
          completed: topics.length > 0 && topics.every(isTopicCompleted),
        };
      }),
    [grouped]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto flex flex-col gap-6">
      <ProfileHeader stageBadges={stageBadges} />
      <StatsCards stats={stats} progress={progress} />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        <div className="w-full lg:w-1/2">
          <AchievementsCard stats={stats} progress={progress} />
        </div>

        <div className="w-full lg:w-1/2">
          <StageProgressCard progress={progress} />
        </div>
      </div>
    </div>
  );
};
