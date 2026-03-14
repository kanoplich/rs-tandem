import { TASK_PROGRESS } from '../../locales';

import { Progress } from '@/shared/ui/progress';

export const TaskProgress = () => {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl p-6 rounded-xl bg-[var(--card)] border-1 border-color-[var(--border)]">
        <div className="flex justify-between items-center">
          <h3 className="text-base">{TASK_PROGRESS.LABEL}</h3>
          <div className="text-sm font-bold text-[var(--primary)]">{TASK_PROGRESS.VALUE}</div>
        </div>
        <Progress className="mt-6" />
      </div>
    </section>
  );
};
