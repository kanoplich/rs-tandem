import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TaskAdvise } from './ui/task-advise';
import { TaskChat } from './ui/task-chat';
import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

import { getTasksByTopic, type Task as TaskType } from '@/shared/api';

export const Task = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topicsCount, setTopicsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const topics = searchParams.get('topics');

  if (!topics) {
    throw new Error('No topics');
  }

  const topicsArr = topics.split(',');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const results: TaskType[][] = await Promise.all(
          topicsArr.map((topic) => getTasksByTopic(topic))
        );

        setTopicsCount(topicsArr.length);
        const sortedTasks = results.flat().sort((a, b) => a.difficulty - b.difficulty);
        setTasks(sortedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, [topicsArr]);

  return (
    <div className="flex flex-col">
      <TaskHeader />
      <TaskProgress />
      <TaskChat tasks={tasks} currentIndex={currentIndex} topicsCount={topicsCount} />
      <TaskAdvise />
    </div>
  );
};
