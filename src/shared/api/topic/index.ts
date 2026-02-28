import { supabase, type Public } from '../supabase-client';

import { MOCK_TOPICS } from './mock';
import type { Topic } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

type TopicRow = Public['Tables']['topics']['Row'];

const mapToTopic = (data: TopicRow[]): Topic[] => {
  return data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description ?? '',
      icon: item.icon ?? '',
      taskCount: item.task_count ?? 0,
      stage: item.stage,
    };
  });
};

export const getTopics = async (): Promise<Topic[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_TOPICS;
  }

  const { data: topics, error } = await supabase.from('topics').select('*').order('sort_order');

  if (error || !topics) {
    throw error || new Error('Topics error');
  }

  return mapToTopic(topics);
};
