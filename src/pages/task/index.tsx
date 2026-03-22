import { useSearchParams } from 'react-router-dom';

import { useTasksLoading } from './hooks/use-tasks-loading';
import { TaskAdvice } from './ui/task-advice';
import { TaskArea } from './ui/task-area';
import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

import { Loader } from '@/shared';

export const Task = () => {
  const [searchParams] = useSearchParams();

  const topics = searchParams.get('topics');
  const stage = searchParams.get('stage');

  const { tasks, stageNumber, isLoading } = useTasksLoading({ stage, topics });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <TaskHeader stageNumber={stageNumber} tasks={tasks} />
      <TaskProgress />
      <TaskArea tasks={tasks} />
      <TaskAdvice />
    </div>
  );
};
