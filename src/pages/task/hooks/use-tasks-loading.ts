import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TASK_LOADING_ERRORS } from '../locales';

import { ROUTES } from '@/shared';
import { getTasksByTopic, type Task } from '@/shared/api';

interface UseTasksLoadingProps {
  stage: string | null;
  topics: string | null;
}

interface UseTasksReturn {
  tasks: Task[];
  stageNumber: number;
  isLoading: boolean;
}

export const useTasksLoading = ({ stage, topics }: UseTasksLoadingProps): UseTasksReturn => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stageNumber, setStageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const parsedStage = stage ? Number.parseInt(stage, 10) : 1;
        setStageNumber(parsedStage);

        if (!topics) {
          toast.error(TASK_LOADING_ERRORS.NO_TOPICS);
          navigate(ROUTES.TOPICS);
          return;
        }

        const topicsArr = topics.split(',');

        const results: Task[][] = await Promise.all(
          topicsArr.map((topic) => getTasksByTopic(topic))
        );

        const sortedTasks = results.flat().sort((a, b) => a.difficulty - b.difficulty);
        setTasks(sortedTasks);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : TASK_LOADING_ERRORS.TASKS_LOADING);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [topics, stage, navigate]);

  return {
    tasks,
    stageNumber,
    isLoading,
  };
};
