import type { Task } from '@/shared/api';

interface TaskWelcomeMessageProps {
  tasks: Task[];
}

export const TaskWelcomeMessage = ({ tasks }: TaskWelcomeMessageProps) => {
  const currentTask = tasks[0];
  return (
    <section className="pb-6">
      <div className="flex flex-col mx-auto max-w-5xl p-6 rounded-xl bg-card">
        <div>{currentTask?.topicId}</div>
        <p>Привет</p>
        <div>Task</div>
      </div>
    </section>
  );
};
