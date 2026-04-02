import { JUDGE_LEVEL, type JudgeLevel } from '../judge/types';
import { supabase, type Public } from '../supabase-client';

import { MOCK_SUBMISSIONS } from './mock';
import type { Submission } from './types';

import { DEFAULT_MAX_SCORE, DEFAULT_STAGES_VALUE, PASSING_SCORE } from '@/shared';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

type PublicSubmissionRow = Public['Tables']['submissions']['Row'] & {
  public_tasks: {
    title: string | null;
    topic_id: string | null;
    topics: {
      title: string;
      stage: number;
    } | null;
  };
};
const VALID_JUDGE_LEVELS = new Set<number>(Object.values(JUDGE_LEVEL));

const toJudgeLevel = (value: unknown): JudgeLevel => {
  if (typeof value === 'number' && VALID_JUDGE_LEVELS.has(value)) {
    return value as JudgeLevel;
  }
  return JUDGE_LEVEL.KEYWORD;
};

const mapToSubmission = (data: PublicSubmissionRow): Submission => {
  return {
    id: data.id,
    userId: data.user_id,
    taskId: data.task_id,
    answer: data.answer,
    submittedAt: data.submitted_at,
    taskTitle: data.public_tasks.title ?? '',
    title: data.public_tasks.topics?.title ?? '',
    stage: data.public_tasks.topics?.stage ?? DEFAULT_STAGES_VALUE,
    result: {
      coveredPoints: data.covered ?? [],
      missedPoints: data.missed ?? [],
      feedback: data.feedback ?? '',
      score: data.score ?? 0,
      maxScore: DEFAULT_MAX_SCORE,
      judgeLevel: toJudgeLevel(data.judge_level),
    },
  };
};

export const getSubmissionHistory = async (): Promise<Submission[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_SUBMISSIONS;
  }

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*, public_tasks!task_id(title, topic_id, topics(title, stage))')
    .order('submitted_at', { ascending: false })
    .throwOnError();

  return submissions.map((item) => mapToSubmission(item));
};

export const getSubmissionHistoryByTaskId = async (taskId: string): Promise<Submission> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    const submission = MOCK_SUBMISSIONS.find((item) => item.taskId === taskId);

    if (!submission) throw new Error(`Submission not found`);

    return submission;
  }

  const { data: submission } = await supabase
    .from('submissions')
    .select('*, public_tasks!task_id(title, topic_id, topics(title, stage))')
    .eq('task_id', taskId)
    .order('submitted_at', { ascending: false })
    .limit(1)
    .single()
    .throwOnError();

  return mapToSubmission(submission);
};

export const getPassedSubmissionHistory = async (): Promise<Submission[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    const passedSubmission = MOCK_SUBMISSIONS.filter((data) => data.result.score >= PASSING_SCORE);

    return passedSubmission;
  }

  const { data: passedSubmission } = await supabase
    .from('submissions')
    .select('*, public_tasks!task_id(title, topic_id, topics(title, stage))')
    .gte('score', PASSING_SCORE)
    .order('submitted_at', { ascending: false })
    .throwOnError();

  return passedSubmission.map((item) => mapToSubmission(item));
};
