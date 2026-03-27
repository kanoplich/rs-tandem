interface StatCardProps {
  icon: React.ReactNode;
  description: string;
  stats: string;
}

export const StatCard = ({ icon, description, stats }: StatCardProps) => {
  return (
    <div className="flex flex-row gap-4 items-start">
      <div className="flex flex-col justify-end">{icon}</div>
      <div className="flex flex-col justify-between h-full">
        <p className="text-sm">{description}</p>
        <p className="text-light text-2xl font-bold leading-8">{stats}</p>
      </div>
    </div>
  );
};
