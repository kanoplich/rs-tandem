import { useSearchParams } from 'react-router-dom';

import { useTaskSession, useTasksLoading } from './hooks';
import { TaskAdvice } from './ui/task-advice';
import { TaskAnswer } from './ui/task-answer';
import { TaskArea } from './ui/task-area';
import { TaskEmptyState } from './ui/task-empty-state';
import { TaskFeedback } from './ui/task-feedback';
import { TaskHeader } from './ui/task-header';
import { TaskMessage } from './ui/task-message';
import { TaskProgress } from './ui/task-progress';
import { TaskResult } from './ui/task-result';

import { Loader, TASK_MODES, type TaskMode } from '@/shared';

export const Task = () => {
  const [searchParams] = useSearchParams();
  const topicsParam = searchParams.get('topics');
  const rawMode = searchParams.get('mode');
  const mode: TaskMode = rawMode === TASK_MODES.restart ? TASK_MODES.restart : TASK_MODES.continue;
  const { tasks, isLoading } = useTasksLoading({ topicsParam, mode });
  const {
    currentTaskNumber,
    tasksCount,
    currentTask,
    handleSubmit,
    userAnswer,
    feedback,
    result,
    progressPercent,
    handleNext,
    handleRetry,
    isSending,
    isPassed,
    isLastTask,
    stageNumber,
  } = useTaskSession({
    tasks,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (tasks.length === 0 && !isLoading) {
    return <TaskEmptyState />;
  }

  return (
    <div className="flex flex-col mx-auto max-w-5xl p-1">
      <TaskHeader
        currentTaskNumber={currentTaskNumber}
        stageNumber={stageNumber}
        tasksCount={tasksCount}
      />
      <TaskProgress progressPercent={progressPercent} />
      {currentTask && <TaskArea task={currentTask} />}
      {userAnswer ? (
        <TaskAnswer userAnswer={userAnswer} />
      ) : (
        <TaskMessage onSubmit={handleSubmit} />
      )}
      {isSending && (
        <span className="inline-block w-1.5 h-4 mb-2 bg-primary ml-0.5 animate-pulse" />
      )}
      {feedback && <TaskFeedback feedback={feedback} />}
      {result && (
        <TaskResult
          result={result}
          onNext={handleNext}
          onRetry={handleRetry}
          isPassed={isPassed}
          isLastTask={isLastTask}
        />
      )}
      <TaskAdvice />
    </div>
  );
};
