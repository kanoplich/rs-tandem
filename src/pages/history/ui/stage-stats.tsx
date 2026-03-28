import { HISTORY_PAGE_TEXT } from '../locales';
import { type StageStatsProps } from '../model';

import { Card } from '@/shared';

export const StageStats = ({ items }: StageStatsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{HISTORY_PAGE_TEXT.STAGE_STATS.TITLE}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.stage} className="p-4">
            <div className="w-fit px-3 py-1 text-xs rounded-md bg-input text-light">
              {HISTORY_PAGE_TEXT.STAGE_STATS.STAGE_PREFIX} {item.stage}
            </div>

            <div>
              <div className="flex justify-between text-sm text-muted-foreground">
                {HISTORY_PAGE_TEXT.STAGE_STATS.TRAININGS}
                <div className="text-base text-light font-semibold">{item.total}</div>
              </div>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              {' '}
              {HISTORY_PAGE_TEXT.STAGE_STATS.AVG}{' '}
              <div className="text-sm font-semibold text-primary">
                {item.avg.toFixed(1)}
                {HISTORY_PAGE_TEXT.CARD.DIVIDER}
                {HISTORY_PAGE_TEXT.CARD.MAX_SCORE}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
