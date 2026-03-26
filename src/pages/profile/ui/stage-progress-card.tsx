import { STAGE_PROGRESS_TEXT } from '../locales';

import {
  Card,
  getProgressPercent,
  isTopicCompleted,
  Progress,
  STAGES,
  groupByStage,
} from '@/shared';
import type { TopicProgress } from '@/shared/api';

type StageProgressProps = {
  progress: TopicProgress[];
};

export const StageProgressCard = ({ progress }: StageProgressProps) => {
  const grouped = groupByStage(progress);

  return (
    <Card className="p-4 sm:p-6 w-full">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-base sm:text-lg font-bold">{STAGE_PROGRESS_TEXT.TITLE}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground ">{STAGE_PROGRESS_TEXT.SUBTITLE}</p>
      </div>

      <div className="flex flex-col gap-4">
        {STAGES.map(({ id, title }) => {
          const topics = grouped[id] || [];

          const completed = topics.filter(isTopicCompleted).length;
          const total = topics.length;
          const percent = getProgressPercent(completed, total);

          return (
            <div key={id} className="flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm sm:text-base break-words">{title}</span>
                <span className="text-sm shrink-0">{percent}%</span>
              </div>

              <Progress value={percent} />

              <div className="text-xs sm:text-sm text-muted-foreground">
                {completed} из {total} тем завершено
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
