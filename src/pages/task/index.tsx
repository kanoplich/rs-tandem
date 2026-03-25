import Markdown from 'react-markdown';
import { useSearchParams } from 'react-router-dom';

import { useTaskSession, useTasksLoading } from './hooks';
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
  const { currentTaskNumber, tasksCount, currentTask, handleSubmit, userAnswer, feedback } =
    useTaskSession({
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
      <TaskProgress />
      {currentTask && <TaskArea task={currentTask} />}
      <section className="pb-6">
        <div className="p-3 sm:p-6 rounded-xl bg-card border border-border">
          {userAnswer ? <Markdown>{userAnswer}</Markdown> : <TaskMessage onSubmit={handleSubmit} />}
        </div>
      </section>
      {feedback && (
        <div style={{ marginTop: 16, padding: 12, background: '#f4f4f4', borderRadius: 8 }}>
          <strong>Фидбэк:</strong>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feedback}</p>
        </div>
      )}
      <TaskAdvice />
    </div>
  );
};
