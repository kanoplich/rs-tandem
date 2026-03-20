import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { TASK_LOADING_ERRORS } from '../locales';

import { getTasksByTopic, type Task } from '@/shared/api';

interface UseTasksLoadingProps {
  stage: string | null;
  topics: string | null;
}

interface UseTasksReturn {
  tasks: Task[];
  stageNumber: number;
  isLoading: boolean;
  error: string | null;
}

export const useTasksLoading = ({ stage, topics }: UseTasksLoadingProps): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stageNumber, setStageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const parsedStage = stage ? Number.parseInt(stage, 10) : 1;
      setStageNumber(parsedStage);

      if (!topics) {
        setTasks([]);
        toast.error(TASK_LOADING_ERRORS.NO_TOPICS);
        setError(TASK_LOADING_ERRORS.NO_TOPICS);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const topicsArr = topics.split(',');

        const results: Task[][] = await Promise.all(
          topicsArr.map((topic) => getTasksByTopic(topic))
        );

        const sortedTasks = results.flat().sort((a, b) => a.difficulty - b.difficulty);
        setTasks(sortedTasks);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          setError(error.message);
        } else {
          toast.error(TASK_LOADING_ERRORS.TASKS_LOADING);
          setError(TASK_LOADING_ERRORS.TASKS_LOADING);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [topics, stage]);

  return {
    tasks,
    stageNumber,
    isLoading,
    error,
  };
};
