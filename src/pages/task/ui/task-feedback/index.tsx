import { TASK_FEEDBACK } from '../../locales';

import { Markdown } from '@/shared';

interface TaskFeedbackProps {
  feedback: string;
}

export const TaskFeedback = ({ feedback }: TaskFeedbackProps) => {
  return (
    <section className="pb-6">
      <div className="p-3 sm:p-6 rounded-xl border border-border">
        <strong>{TASK_FEEDBACK.TITLE}:</strong>
        <Markdown>{feedback}</Markdown>
      </div>
    </section>
  );
};
