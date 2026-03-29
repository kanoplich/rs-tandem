import { HISTORY_PAGE_TEXT } from '../locales';

import { HistoryCard } from './history-card';

import { Card, type Submission } from '@/shared';
type HistoryListProps = {
  items: Submission[];
};

export const HistoryList = ({ items }: HistoryListProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{HISTORY_PAGE_TEXT.LIST.TITLE}</h2>
        <p className="text-sm text-muted-foreground">{HISTORY_PAGE_TEXT.LIST.DESCRIPTION}</p>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-muted-foreground">{HISTORY_PAGE_TEXT.LIST.EMPTY}</p>
        ) : (
          items.map((item) => <HistoryCard key={item.id} submission={item} />)
        )}
      </div>

      <p className="text-xs text-muted-foreground">{HISTORY_PAGE_TEXT.LIST.ONLY_SUCCESS}</p>
    </Card>
  );
};
