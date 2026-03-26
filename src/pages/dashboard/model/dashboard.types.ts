export type StatCardProps = {
  icon: React.ReactNode;
  description: string;
  stats: number | string;
};

export type StageCardProps = {
  id: number;
  progress: number;
  topicsFinished: string;
  averageScore: string;
};
