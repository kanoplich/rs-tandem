import { TASK_ANSWER } from '../../locales';

import { Markdown } from '@/shared';

interface TaskAnswerProps {
  userAnswer: string;
}

export const TaskAnswer = ({ userAnswer }: TaskAnswerProps) => {
  return (
    <section className="pb-6">
      <div className="p-3 sm:p-6 rounded-xl bg-card border border-border">
        <strong>{TASK_ANSWER.TITLE}:</strong>
        <Markdown>{userAnswer}</Markdown>
      </div>
    </section>
  );
};
