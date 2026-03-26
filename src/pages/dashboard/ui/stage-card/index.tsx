import { STAGE_CARDS_TEXT } from '../../locales';
import type { StageCardProps } from '../../model/dashboard.types';

import { Progress, STAGES } from '@/shared';

export const StageCard = ({ id, progress, topicsFinished, averageScore }: StageCardProps) => {
  const stage = STAGES.find((stage) => stage.id === id);

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col justify-between gap-6">
      <div className="p-6 pb-1.5 flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-light">{stage?.title}</p>
          <p>{stage?.description}</p>
        </div>
        <div className="ml-3 mb-3 px-3 py-1 bg-primary h-fit rounded-full">
          <p className="text-light-foreground font-bold">{progress}%</p>
        </div>
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <p>{STAGE_CARDS_TEXT.PROGRESS_TITLE}</p>
            <div className="flex flex-row font-bold gap-1">
              <p className="text-light">{topicsFinished}</p>
              <p className="text-light">{STAGE_CARDS_TEXT.PROGRESS_ITEM}</p>
            </div>
          </div>
          <div>
            <Progress value={progress} />
          </div>
        </div>
        <div>
          <div className="pt-2 flex flex-row justify-between border-t border-border items-center">
            <p>{STAGE_CARDS_TEXT.AVERAGE_SCORE_TITLE}</p>
            <p className="text-primary text-2xl font-bold">{averageScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
