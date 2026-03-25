import { useProfileData } from './use-profile-data';

export const useProfileStats = () => {
  const { isLoading, stats, progress } = useProfileData();

  const completedTasks = stats?.completedTasks ?? 0;
  const rank = stats?.rank;
  const xp = stats?.xp ?? 0;

  const avgScore =
    progress.length > 0
      ? (progress.reduce((acc, item) => acc + item.avgScore, 0) / progress.length).toFixed(1)
      : 0;

  return {
    isLoading,
    completedTasks,
    avgScore,
    rank,
    xp,
  };
};
