import Markdown from 'react-markdown';

import { TASK_FEEDBACK } from '../../locales';

interface TaskFeedbackProps {
  feedback: string;
}

export const TaskFeedback = ({ feedback }: TaskFeedbackProps) => {
  return (
    <section className="pb-6">
      <div className="p-3 sm:p-6 rounded-xl bg-muted-foreground border border-border">
        <strong>{TASK_FEEDBACK.TITLE}:</strong>
        <Markdown>{feedback}</Markdown>
      </div>
    </section>
  );
};
