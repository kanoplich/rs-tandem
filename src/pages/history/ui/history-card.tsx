import { STAGES, formatScore, MAX_DISPLAY_SCORE } from '@/shared';
import type { Submission } from '@/shared';

type HistoryCardProps = {
  submission: Submission;
};

export const HistoryCard = ({ submission }: HistoryCardProps) => {
  const stageInfo = STAGES.find((s) => s.id === submission.stage);

  return (
    <div className="flex items-center justify-between border rounded-xl p-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-secondary text-primary px-2 py-1 rounded">
            {stageInfo?.title}
          </span>
          <span className="font-medium text-light">{submission.title}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-semibold text-success">
          {formatScore(submission.result.score)}
        </div>
        <div className="text-xs text-muted-foreground">/{MAX_DISPLAY_SCORE}</div>
      </div>
    </div>
  );
};
