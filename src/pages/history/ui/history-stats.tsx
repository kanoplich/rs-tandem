import { HISTORY_PAGE_TEXT } from '../locales';
import type { HistoryStatsProps } from '../model';

import { Card } from '@/shared';
import { MAX_DISPLAY_SCORE } from '@/shared/lib/constants';

export const HistoryStats = ({ total, avg, best }: HistoryStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="text-sm text-muted-foreground">{HISTORY_PAGE_TEXT.STATS.TOTAL}</div>
        <div className="text-2xl font-bold mt-2 text-light">{total}</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm text-muted-foreground">{HISTORY_PAGE_TEXT.STATS.AVG}</div>
        <div className="text-2xl font-bold mt-2 text-primary">
          {avg}/{MAX_DISPLAY_SCORE}
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm text-muted-foreground">{HISTORY_PAGE_TEXT.STATS.BEST}</div>
        <div className="text-2xl font-bold mt-2 text-success">
          {best}/{MAX_DISPLAY_SCORE}
        </div>
      </Card>
    </div>
  );
};
