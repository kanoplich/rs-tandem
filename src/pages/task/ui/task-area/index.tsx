import Markdown from 'react-markdown';

import { TASK_AREA } from '../../locales';

import type { Task } from '@/shared/api';

interface TaskAreaProps {
  tasks: Task[];
  userAnswer: string;
}

export const TaskArea = ({ tasks, userAnswer }: TaskAreaProps) => {
  const currentTask = tasks[0];
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl p-6 rounded-xl bg-card border border-border">
        <h2 className="w-fit font-light text-primary text-sm px-3 py-1.5 rounded-md bg-secondary">
          {currentTask?.title}
        </h2>
        <p className="py-4">{TASK_AREA.WELCOME_MESSAGE}</p>
        <hr />
        <p className="pt-3 font-bold text-base sm:text-lg">{currentTask?.questionText}</p>

        {userAnswer && (
          <div className="pt-6">
            <Markdown>{userAnswer}</Markdown>
          </div>
        )}
      </div>
    </section>
  );
};
