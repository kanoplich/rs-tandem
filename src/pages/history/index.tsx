import { useHistory } from './hooks';
import { HISTORY_PAGE_TEXT } from './locales';
import { HistoryList, HistoryStats, StageStats } from './ui';

export const History = () => {
  const { stages, history, isLoading, total, avg, best } = useHistory();

  if (isLoading) {
    return <div className="p-6">{HISTORY_PAGE_TEXT.HEADER.LOADING}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{HISTORY_PAGE_TEXT.HEADER.TITLE}</h1>
        <p className="text-muted-foreground">{HISTORY_PAGE_TEXT.HEADER.DESCRIPTION}</p>
      </div>

      <HistoryStats total={total} avg={avg} best={best} />

      <HistoryList items={history} />

      <StageStats items={stages} />
    </div>
  );
};
