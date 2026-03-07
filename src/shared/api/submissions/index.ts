import { type JudgeLevel } from '../judge/types';
import { supabase, type Public } from '../supabase-client';
import { DEFAULT_MAX_SCORE } from '../task/types';

import { MOCK_SUBMISSIONS } from './mock';
import type { Submission } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

type SubmissionsRow = Public['Tables']['submissions']['Row'];

const { USE_MOCK_SUPABASE } = config;

const mapToSubmission = (data: SubmissionsRow[]): Submission[] => {
  return data.map((item) => {
    return {
      id: item.id,
      userId: item.user_id,
      taskId: item.task_id,
      answer: item.answer,
      submittedAt: item.submitted_at,
      result: {
        coveredPoints: item.covered,
        missedPoints: item.missed,
        feedback: item.feedback,
        score: item.score,
        maxScore: DEFAULT_MAX_SCORE,
        judgeLevel: item.judge_level as JudgeLevel,
      },
    };
  });
};

export async function getSubmissionHistory(): Promise<Submission[]> {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_SUBMISSIONS;
  }

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .order('submitted_at', { ascending: false })
    .throwOnError();

  return mapToSubmission(submissions);
}
