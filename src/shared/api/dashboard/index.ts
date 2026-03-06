import { MOCK_TOPIC_PROGRESS, MOCK_USER_STATS } from './mock';
import type { TopicProgress, UserStats } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export async function getDashboardStats(): Promise<UserStats | void> {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_USER_STATS;
  }
}

export async function getTopicProgress(): Promise<TopicProgress[] | void> {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_TOPIC_PROGRESS;
  }
}
