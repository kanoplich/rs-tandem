import { supabase } from '../supabase-client';

import { MOCK_TOPICS } from './mock';
import type { Topic } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export const getTopics = async (): Promise<Topic[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_TOPICS;
  }

  const { data: topics } = await supabase
    .from('topics')
    .select('*, public_tasks(count)')
    .order('sort_order')
    .throwOnError();

  return topics.map((t) => {
    return {
      id: t.id,
      description: t.description,
      icon: t.icon,
      stage: t.stage,
      title: t.title,
      taskCount: t.public_tasks[0]?.count ?? 0,
    };
  });
};
