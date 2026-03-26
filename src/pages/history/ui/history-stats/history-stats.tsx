import { Card } from '@/shared/ui';

interface HistoryStatsProps {
  total: number;
  avg: number | string;
  best: number;
}

export const HistoryStats = ({ total, avg, best }: HistoryStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="text-sm text-muted-foreground">Всего тренировок</div>
        <div className="text-2xl font-bold mt-2 text-light">{total}</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm text-muted-foreground">Средний балл</div>
        <div className="text-2xl font-bold mt-2 text-primary">{avg}/10</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm text-muted-foreground">Лучший результат</div>
        <div className="text-2xl font-bold mt-2 text-success">{best}/10</div>
      </Card>
    </div>
  );
};
