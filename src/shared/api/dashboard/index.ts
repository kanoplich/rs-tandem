import { supabase } from '../supabase-client';

import { MOCK_TOPIC_PROGRESS, MOCK_USER_STATS } from './mock';
import type { TopicProgress, UserStats } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export async function getDashboardStats(): Promise<UserStats> {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_USER_STATS;
  }

  const { data, error } = await supabase.rpc('get_user_stats');

  if (error || typeof data !== 'string') {
    throw error || console.error('DashboardStats error');
  }

  if (typeof data !== 'string') {
    return data as UserStats;
  }

  return JSON.parse(data) as UserStats;
}

export async function getTopicProgress(): Promise<TopicProgress[]> {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_TOPIC_PROGRESS;
  }

  const { data, error } = await supabase.rpc('get_topic_progress');

  if (error || typeof data !== 'string') {
    throw error || console.error('DashboardStats error');
  }

  return JSON.parse(data) as TopicProgress[];
}
