import { HISTORY_PAGE_TEXT } from '../locales';
import type { StageStatsProps } from '../model';

import { Card, STAGES, formatScore } from '@/shared';
import { MAX_DISPLAY_SCORE } from '@/shared/lib/constants';

export const StageStats = ({ items }: StageStatsProps) => {
  if (items.length === 0) return null;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{HISTORY_PAGE_TEXT.STAGE_STATS.TITLE}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {items.map((item) => {
          const stageInfo = STAGES.find((s) => s.id === item.stage);

          return (
            <Card key={item.stage} className="p-4">
              <div className="w-fit px-3 py-1 text-xs rounded-md bg-input text-light">
                {stageInfo?.title}
              </div>

              <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                <span>{HISTORY_PAGE_TEXT.STAGE_STATS.TRAININGS}</span>
                <span className="font-semibold text-light">{item.total}</span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{HISTORY_PAGE_TEXT.STAGE_STATS.AVG}</span>
                <span className="font-semibold text-primary">
                  {formatScore(item.avgScore)}/{MAX_DISPLAY_SCORE}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};
