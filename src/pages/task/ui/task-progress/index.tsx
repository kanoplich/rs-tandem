import { TASK_PROGRESS } from '../../locales';

import { Progress } from '@/shared/ui';

interface TaskProgressProps {
  progressPercent: number;
}

export const TaskProgress = ({ progressPercent }: TaskProgressProps) => {
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl p-3 sm:p-6 rounded-xl bg-card border border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-base">{TASK_PROGRESS.LABEL}</h3>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <Progress className="mt-6" value={progressPercent} />
      </div>
    </section>
  );
};
