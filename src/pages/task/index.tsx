import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useTasksLoading } from './hooks/use-tasks-loading';
import { TaskAdvice } from './ui/task-advice';
import { TaskArea } from './ui/task-area';
import { TaskEmptyState } from './ui/task-empty-state';
import { TaskHeader } from './ui/task-header';
import { TaskMessage } from './ui/task-message';
import { TaskProgress } from './ui/task-progress';

import { Loader } from '@/shared';

export const Task = () => {
  const [searchParams] = useSearchParams();
  const topicsParam = searchParams.get('topics');
  const stage = searchParams.get('stage');
  const { tasks, stageNumber, isLoading } = useTasksLoading({ stage, topicsParam });
  const [currentTaskIndex] = useState(0);

  const handleTaskMessage = (message: string) => {
    console.warn(message);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (tasks.length === 0 && !isLoading) {
    return <TaskEmptyState />;
  }

  return (
    <div className="flex flex-col mx-auto max-w-5xl p-1">
      <TaskHeader
        currentTaskNumber={currentTaskIndex + 1}
        stageNumber={stageNumber}
        tasksCount={tasks.length}
      />
      <TaskProgress />
      {tasks[currentTaskIndex] && <TaskArea task={tasks[currentTaskIndex]} />}
      <TaskMessage onSubmit={handleTaskMessage} />
      <TaskAdvice />
    </div>
  );
};
