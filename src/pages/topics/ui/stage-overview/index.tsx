import { STAGES } from '@/shared';

interface StageOverviewProps {
  stageId: number;
}

export const StageOverview = ({ stageId }: StageOverviewProps) => {
  const stage = STAGES.find((stage) => stage.id === stageId);
  if (!stage) return null;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start justify-between mb-4">
        <h3>{stage.title}</h3>
      </div>
    </div>
  );
};
