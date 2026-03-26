import { useHistory } from './hooks/use-history';
import { HISTORY_PAGE_TEXT } from './locales';
import { HistoryList } from './ui/history-list/history-list';
import { HistoryStats } from './ui/history-stats/history-stats';
import { StageStats } from './ui/stage-stats/stage-stats';

export const History = () => {
  const { stages, history, isLoading } = useHistory();

  if (isLoading) {
    return <div className="p-6">Загрузка...</div>;
  }

  const total = history.length;

  const avg =
    history.length > 0
      ? (history.reduce((sum, item) => sum + item.score, 0) / history.length).toFixed(1)
      : '0.0';

  const best = history.length > 0 ? Math.max(...history.map((item) => item.score)) : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{HISTORY_PAGE_TEXT.TITLE}</h1>
        <p className="text-muted-foreground">Все ваши результаты и достижения</p>
      </div>

      <HistoryStats total={total} avg={avg} best={best} />

      <HistoryList items={history} />

      <StageStats
        items={stages.map((s) => ({
          stage: s.stage,
          total: s.totalTopics,
          avg: s.avgScore,
        }))}
      />
    </div>
  );
};
