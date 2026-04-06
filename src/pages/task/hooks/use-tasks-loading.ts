import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TASK_LOADING_ERRORS } from '../locales';

import { ROUTES, TASK_MODES, type TaskMode } from '@/shared';
import { getPassedSubmissionHistory, getTasksByTopic, type Task } from '@/shared/api';

interface UseTasksLoadingProps {
  topicsParam: string | null;
  mode: TaskMode;
}

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
}

export const useTasksLoading = ({ topicsParam, mode }: UseTasksLoadingProps): UseTasksReturn => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (!topicsParam) {
          toast.error(TASK_LOADING_ERRORS.NO_TOPICS);
          navigate(ROUTES.TOPICS);
          return;
        }

        const topicsArr = topicsParam.split(',');
        const loadedTasks: Task[] = await getTasksByTopic(topicsArr);

        if (loadedTasks.length === 0) {
          return;
        }

        if (mode === TASK_MODES.continue) {
          const passedTaskSubmission = await getPassedSubmissionHistory();
          const passedTaskIds = new Set(passedTaskSubmission.map((sub) => sub.taskId));

          const remaining = loadedTasks.filter((task) => !passedTaskIds.has(task.id));

          if (remaining.length === 0) {
            toast.info(TASK_LOADING_ERRORS.ALL_TASKS_COMPLETED);
            navigate(ROUTES.TOPICS);
            return;
          }

          setTasks(remaining);
        } else {
          setTasks(loadedTasks);
        }
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : TASK_LOADING_ERRORS.TASKS_LOADING);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [topicsParam, navigate, mode]);

  return {
    tasks,
    isLoading,
  };
};
