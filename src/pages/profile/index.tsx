import { useMemo } from 'react';

import { useProfileData } from './hooks';
import { ProfileHeader, StageProgressCard, StatsCards } from './ui';

import { isTopicCompleted, Loader, STAGES } from '@/shared';

export const Profile = () => {
  const { stats, progress, isLoading } = useProfileData();

  const stageBadges = useMemo(
    () =>
      STAGES.map((stage) => {
        const topics = progress.filter((t) => t.stage === stage.id);
        return {
          title: stage.title,
          completed: topics.length > 0 && topics.every(isTopicCompleted),
        };
      }),
    [progress]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto flex flex-col gap-6">
      <ProfileHeader stageBadges={stageBadges} />
      <StatsCards stats={stats} progress={progress} />
      <StageProgressCard progress={progress} />
    </div>
  );
};
