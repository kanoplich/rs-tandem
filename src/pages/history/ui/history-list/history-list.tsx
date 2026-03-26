import { Card } from '@/shared/ui';

interface HistoryItem {
  id: string;
  title: string;
  stage: number;
  date: string;
  duration: string;
  score: number;
}

interface HistoryListProps {
  items: HistoryItem[];
}

export const HistoryList = ({ items }: HistoryListProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Все тренировки</h2>
        <p className="text-sm text-muted-foreground">Хронология ваших занятий</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border rounded-xl p-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-secondary text-primary px-2 py-1 rounded">
                  Stage {item.stage}
                </span>
                <span className="font-medium text-light">{item.title}</span>
              </div>

              <div className="text-xs text-muted-foreground mt-1">
                {item.date && item.duration && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.date} • {item.duration}
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold text-success">{item.score}</div>
              <div className="text-xs text-muted-foreground">из 10</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
