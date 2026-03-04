import { MOCK_TOPICS } from './mock';
import type { Topic } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export const getTopics = async (): Promise<Topic[] | void> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_TOPICS;
  }
};
