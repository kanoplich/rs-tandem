import { TASK_PROGRESS } from '../../locales';

import { Field, FieldLabel, Progress } from '@/shared/ui';

interface TaskProgressProps {
  progressPercent: number;
}

export const TaskProgress = ({ progressPercent }: TaskProgressProps) => {
  return (
    <section className="pb-6">
      <Field className="mx-auto max-w-5xl p-3 sm:p-6 rounded-xl bg-card border border-border">
        <FieldLabel className="flex justify-between items-center" htmlFor="progress">
          <h3 className="text-base">{TASK_PROGRESS.LABEL}</h3>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </FieldLabel>
        <Progress value={progressPercent} id="progress" />
      </Field>
    </section>
  );
};
