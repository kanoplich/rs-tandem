import { MOCK_SUBMISSIONS } from './mock';
import type { Submission } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export async function getSubmissionHistory(): Promise<Submission[] | void> {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_SUBMISSIONS;
  }
}
