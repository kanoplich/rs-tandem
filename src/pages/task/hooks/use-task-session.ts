import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { USE_TASK_SESSION } from '../locales';

import { DEFAULT_STAGES_VALUE, getProgressPercent, PASSING_SCORE } from '@/shared';
import {
  evaluateTheory,
  getSubmissionHistoryByTaskId,
  type JudgeResult,
  type Task,
} from '@/shared/api';
import { getErrorMessage } from '@/shared/api/judge/api-error';

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
  stageNumber: number;
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

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const currentTask = tasks[currentIndex] || null;
  const currentTaskNumber = currentIndex + 1;
  const tasksCount = tasks.length;
  const stageNumber = currentTask?.stage || DEFAULT_STAGES_VALUE;
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

    setFeedback('');
    setResult(null);
    setIsSending(true);

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    try {
      reader = await evaluateTheory(currentTask.id, message, controller.signal);
      const decoder = new TextDecoder();

      let streamError = false;
      let scoringError = false;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setFeedback((prev) => prev + decoder.decode());
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes('[ERROR]')) {
          streamError = true;
          break;
        }
        if (chunk.includes('[SCORING_ERROR]')) {
          scoringError = true;
          break;
        }
        setFeedback((prev) => prev + chunk);
      }

      if (streamError) {
        toast.error(USE_TASK_SESSION.EVALUATION_ERROR);
        return;
      }

      if (scoringError) {
        toast.error(USE_TASK_SESSION.SCORING_ERROR);
        return;
      }

      const submission = await getSubmissionHistoryByTaskId(currentTask.id);
      if (controller.signal.aborted) return;

      const judgeResult = submission.result;
      const passed = submission.result.score >= PASSING_SCORE;

      if (passed) {
        handleSuccess();
      }

      setResult(judgeResult);
      setIsPassed(passed);
    } catch (error: unknown) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        toast.error(getErrorMessage(error));
      }
    } finally {
      reader?.cancel().catch(() => {});
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
    stageNumber,
    handleNext,
    handleRetry,
    handleSubmit,
  };
};
