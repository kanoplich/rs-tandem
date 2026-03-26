import { Card } from '@/shared/ui';

interface StageStatsItem {
  stage: number;
  total: number;
  avg: number;
}

interface StageStatsProps {
  items: StageStatsItem[];
}

export const StageStats = ({ items }: StageStatsProps) => {
  return (
    <Card className="p-6">
      {/* Заголовок */}
      <h2 className="text-lg font-semibold">Статистика по этапам</h2>

      {/* Внутренние карточки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.stage} className="p-4">
            {/* Stage badge */}
            <div className="w-fit px-3 py-1 text-xs rounded-md bg-input text-light">
              Stage {item.stage}
            </div>

            {/* Trainings */}
            <div>
              <div className="flex justify-between text-sm text-muted-foreground">
                Тренировок:<div className="text-base text-light font-semibold">{item.total}</div>
              </div>
            </div>

            {/* Avg */}
            <div className="flex justify-between text-sm text-muted-foreground">
              {' '}
              Средний балл:{' '}
              <div className="text-sm font-semibold text-primary">{item.avg.toFixed(1)}/10</div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
