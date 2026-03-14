import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

export const Task = () => {
  return (
    <div className="flex flex-col">
      <TaskHeader />
      <TaskProgress />
    </div>
  );
};
