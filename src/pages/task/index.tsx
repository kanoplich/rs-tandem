import { useSearchParams } from 'react-router-dom';

import { useTasksLoading } from './hooks/use-tasks-loading';
import { TaskAdvice } from './ui/task-advice';
import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

export const Task = () => {
  const [searchParams] = useSearchParams();

  const { tasks, stageNumber } = useTasksLoading({
    topics: searchParams.get('topics'),
    stage: searchParams.get('stage'),
  });

  return (
    <div className="flex flex-col">
      <TaskHeader stageNumber={stageNumber} tasks={tasks} />
      <TaskProgress />
      <TaskAdvice />
    </div>
  );
};
