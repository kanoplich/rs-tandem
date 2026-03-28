import { HISTORY_PAGE_TEXT } from '../locales';
import { type HistoryCardProps } from '../model';

import { STAGES, formatScore, Progress } from '@/shared';

export const HistoryCard = ({
  stage,
  completedTopics,
  totalTopics,
  percent,
  avgScore,
}: HistoryCardProps) => {
  const stageInfo = STAGES.find((s) => s.id === stage);

  return (
    <div className="p-4 border rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">{stageInfo?.title}</p>
          <p className="text-sm text-muted-foreground">{stageInfo?.description}</p>
        </div>

        <div className="text-right">
          <div className="text-sm">
            {completedTopics}
            {HISTORY_PAGE_TEXT.CARD.DIVIDER}
            {totalTopics}
          </div>
          <div className="text-xs text-muted-foreground">
            {percent}
            {HISTORY_PAGE_TEXT.CARD.PERCENT}
          </div>
        </div>
      </div>

      <Progress value={percent} />

      <div className="text-sm text-muted-foreground">
        {HISTORY_PAGE_TEXT.STAGE_STATS.AVG} {formatScore(avgScore)} {HISTORY_PAGE_TEXT.CARD.FROM}{' '}
        {HISTORY_PAGE_TEXT.CARD.MAX_SCORE}
      </div>
    </div>
  );
};
