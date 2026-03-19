import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TaskAdvice } from './ui/task-advice';
import { TaskHeader } from './ui/task-header';
import { TaskProgress } from './ui/task-progress';

import { getTasksByTopic, type Task as TaskType } from '@/shared/api';

export const Task = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [stageNumber, setStageNumber] = useState(1);
  const [searchParams] = useSearchParams();

  const topics = searchParams.get('topics');
  const stage = searchParams.get('stage');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setStageNumber(stage ? Number.parseInt(stage, 10) : 1);

        const topicsArr = topics?.split(',') || [];
        const results: TaskType[][] = await Promise.all(
          topicsArr.map((topic) => getTasksByTopic(topic))
        );

        const sortedTasks = results.flat().sort((a, b) => a.difficulty - b.difficulty);
        setTasks(sortedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, [topics, stage]);

  return (
    <div className="flex flex-col">
      <TaskHeader stageNumber={stageNumber} tasks={tasks} />
      <TaskProgress />
      <TaskAdvice />
    </div>
  );
};
