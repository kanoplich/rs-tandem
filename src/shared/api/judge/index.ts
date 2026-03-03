import { supabase } from '../supabase-client';

import { MOCK_JUDGE_RESULT_GOOD } from './mock';
import type { JudgeResult } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

export const evaluateTheory = async (taskId: string, answer: string): Promise<JudgeResult> => {
  if (config.USE_MOCK_AI) {
    await delay(800);
    return MOCK_JUDGE_RESULT_GOOD;
  }

  const { data, error } = await supabase.functions.invoke('judge', {
    body: { taskId, answer },
  });

  if (error) throw error;
  return data as JudgeResult;
};

export async function getHint(
  taskId: string,
  hintLevel: number
): Promise<{ hint: string; level: number }> {
  if (config.USE_MOCK_AI) {
    await delay(300);
    return { hint: 'Подумай о лексическом окружении...', level: hintLevel };
  }

  const { data, error } = await supabase.functions.invoke('hint', {
    body: { taskId, hintLevel },
  });

  if (error) throw error;
  return data;
}
