export const getProgressPercent = (completed: number, total: number): number =>
  total > 0 ? Math.round((completed / total) * 100) : 0;
