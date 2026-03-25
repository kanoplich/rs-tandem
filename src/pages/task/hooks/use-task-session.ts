import { useState } from 'react';
import { toast } from 'sonner';

import { USE_TASK_SESSION } from '../locales';

import { getSubmissionHistory, type Task } from '@/shared/api';
import { evaluateTheory } from '@/shared/api/judge';
import type { JudgeResult } from '@/shared/api/judge/types';

interface UseTaskSession {
  tasks: Task[];
}

interface UseTaskSessionReturn {
  currentTask: Task | null;
  currentTaskNumber: number;
  tasksCount: number;
  feedback: string;
  result: JudgeResult | null;
  isLoading: boolean;
  userAnswer: string;
  handleSubmit: (message: string) => Promise<void>;
  handleRetry: () => void;
  handleNext: () => void;
}

export const useTaskSession = ({ tasks }: UseTaskSession): UseTaskSessionReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentTask = tasks[currentIndex] || null;
  const currentTaskNumber = currentIndex + 1;
  const tasksCount = tasks.length;

  const reset = () => {
    setUserAnswer('');
    setFeedback('');
    setResult(null);
  };

  const handleRetry = () => {
    reset();
  };

  const handleSubmit = async (message: string) => {
    setUserAnswer(message);

    if (!currentTask?.id) {
      toast.error(USE_TASK_SESSION.ID_MISSING);
      return;
    }

    try {
      const reader = await evaluateTheory(currentTask.id, message);
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setFeedback((prev) => prev + decoder.decode(value));
      }

      const submissions = await getSubmissionHistory();

      const judgeResult = submissions.find((item) => item.taskId === currentTask.id)?.result;

      if (!judgeResult) {
        toast.error(USE_TASK_SESSION.RESULT_UNAVAILABLE);
        return;
      }

      setResult(judgeResult);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : USE_TASK_SESSION.LOADING_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const isPassed = result?.score !== undefined && result.score >= 70;

    if (currentIndex < tasks.length - 1 && isPassed) {
      setCurrentIndex((prev) => prev + 1);
      reset();
    }

    if (currentIndex === tasks.length - 1 && isPassed) {
      toast.success(USE_TASK_SESSION.SUCCESS);
    }
  };

  return {
    currentTask,
    currentTaskNumber,
    tasksCount,
    feedback,
    result,
    userAnswer,
    isLoading,
    handleNext,
    handleRetry,
    handleSubmit,
  };
};
