import { JUDGE_LEVEL, type JudgeLevel } from '../judge/types';
import { supabase } from '../supabase-client';

import { MOCK_SUBMISSIONS } from './mock';
import type { Submission } from './types';

import { DEFAULT_MAX_SCORE } from '@/shared';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

const VALID_JUDGE_LEVELS = new Set<number>(Object.values(JUDGE_LEVEL));

const toJudgeLevel = (value: unknown): JudgeLevel => {
  if (typeof value === 'number' && VALID_JUDGE_LEVELS.has(value)) {
    return value as JudgeLevel;
  }
  return JUDGE_LEVEL.KEYWORD;
};

export const getSubmissionHistory = async (): Promise<Submission[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_SUBMISSIONS;
  }

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*, public_tasks!task_id(topic_id, topics(title, stage))')
    .order('submitted_at', { ascending: false })
    .throwOnError();

  return submissions.map((item) => {
    return {
      id: item.id,
      userId: item.user_id,
      taskId: item.task_id,
      answer: item.answer,
      submittedAt: item.submitted_at,
      title: item.public_tasks.topics?.title ?? '',
      stage: item.public_tasks.topics?.stage ?? 1,
      result: {
        coveredPoints: item.covered ?? [],
        missedPoints: item.missed ?? [],
        feedback: item.feedback ?? '',
        score: item.score ?? 0,
        maxScore: DEFAULT_MAX_SCORE,
        judgeLevel: toJudgeLevel(item.judge_level),
      },
    };
  });
};
