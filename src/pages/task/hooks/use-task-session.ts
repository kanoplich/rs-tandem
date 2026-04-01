import { useState } from 'react';
import { toast } from 'sonner';

import { USE_TASK_SESSION } from '../locales';

import { getProgressPercent, PASSING_SCORE } from '@/shared';
import {
  getSubmissionHistoryByTaskId,
  evaluateTheory,
  type Task,
  type JudgeResult,
} from '@/shared/api';

interface UseTaskSession {
  tasks: Task[];
}

interface UseTaskSessionReturn {
  currentTask: Task | null;
  currentTaskNumber: number;
  tasksCount: number;
  feedback: string;
  result: JudgeResult | null;
  isSending: boolean;
  userAnswer: string;
  isPassed: boolean;
  isLastTask: boolean;
  progressPercent: number;
  handleSubmit: (message: string) => Promise<void>;
  handleRetry: () => void;
  handleNext: () => void;
}

export const useTaskSession = ({ tasks }: UseTaskSession): UseTaskSessionReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const currentTask = tasks[currentIndex] || null;
  const currentTaskNumber = currentIndex + 1;
  const tasksCount = tasks.length;
  const isLastTask = currentTaskNumber === tasksCount;

  const reset = () => {
    setUserAnswer('');
    setFeedback('');
    setResult(null);
    setIsPassed(false);
  };

  const handleRetry = () => {
    reset();
  };

  const handleSuccess = () => {
    const percent = getProgressPercent(currentTaskNumber, tasksCount);
    setProgressPercent(percent);

    if (isLastTask) {
      toast.success(USE_TASK_SESSION.SUCCESS);
    }
  };

  const handleSubmit = async (message: string) => {
    setUserAnswer(message);

    if (!currentTask?.id) {
      toast.error(USE_TASK_SESSION.ID_MISSING);
      return;
    }

    setIsSending(true);

    try {
      const reader = await evaluateTheory(currentTask.id, message);
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setFeedback((prev) => prev + decoder.decode());
          break;
        }

        setFeedback((prev) => prev + decoder.decode(value, { stream: true }));
      }

      const submission = await getSubmissionHistoryByTaskId(currentTask.id);
      const judgeResult = submission.result;
      const passed = submission.result.score >= PASSING_SCORE;

      if (passed) {
        handleSuccess();
      }

      setResult(judgeResult);
      setIsPassed(passed);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : USE_TASK_SESSION.LOADING_ERROR);
    } finally {
      setIsSending(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1 && isPassed) {
      setCurrentIndex((prev) => prev + 1);
      reset();
    }
  };

  return {
    currentTask,
    currentTaskNumber,
    tasksCount,
    feedback,
    result,
    userAnswer,
    isSending,
    isPassed,
    isLastTask,
    progressPercent,
    handleNext,
    handleRetry,
    handleSubmit,
  };
};
