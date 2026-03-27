import { TASK_AREA } from '../../locales';

import type { Task } from '@/shared/api';

interface TaskAreaProps {
  task: Task;
}

export const TaskArea = ({ task }: TaskAreaProps) => {
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl p-3 sm:p-6 rounded-xl bg-card border border-border">
        <h2 className="w-fit font-light text-primary text-sm px-3 py-1.5 rounded-md bg-secondary">
          {task.title}
        </h2>
        <p className="py-4">{TASK_AREA.WELCOME_MESSAGE}</p>
        <hr />
        <p className="pt-3 font-bold text-base sm:text-lg">{task.questionText}</p>
      </div>
    </section>
  );
};
