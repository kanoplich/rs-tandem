import { TASK_PROGRESS } from '../../locales';

import { Progress } from '@/shared/ui';

export const TaskProgress = () => {
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl p-3 sm:p-6 rounded-xl bg-card border border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-base">{TASK_PROGRESS.LABEL}</h3>
          <div className="text-sm font-bold text-primary">{TASK_PROGRESS.VALUE}</div>
        </div>
        <Progress className="mt-6" />
      </div>
    </section>
  );
};
