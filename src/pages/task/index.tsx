import { TaskAdvise } from './ui/task-advise';
import { TaskChat } from './ui/task-chat';
import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

export const Task = () => {
  return (
    <div className="flex flex-col">
      <TaskHeader />
      <TaskProgress />
      <TaskChat />
      <TaskAdvise />
    </div>
  );
};
