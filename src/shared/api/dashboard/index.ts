import { supabase, type Public } from '../supabase-client';

import { MOCK_TOPIC_PROGRESS, MOCK_USER_STATS } from './mock';
import type { TopicProgress, UserStats } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

type UserStatsReturns = Public['Functions']['get_user_stats']['Returns'];
type TopicProgressReturns = Public['Functions']['get_topic_progress']['Returns'];

const { USE_MOCK_SUPABASE } = config;

const mapToUserStats = (data: UserStatsReturns): UserStats => {
  const userStats = data[0];
  if (!userStats) throw new Error('No user stats data');

  return {
    completedTasks: userStats.completed_tasks,
    rank: userStats.rank,
    streak: userStats.streak,
    totalTasks: userStats.total_tasks,
    xp: userStats.xp,
  };
};

export const getDashboardStats = async (): Promise<UserStats> => {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_USER_STATS;
  }

  const { data, error } = await supabase.rpc('get_user_stats');

  if (error) {
    throw error;
  }

  return mapToUserStats(data);
};

const mapToTopicProgress = (data: TopicProgressReturns): TopicProgress[] => {
  return data.map((item) => ({
    avgScore: item.avg_score,
    completed: item.completed,
    topicId: item.topic_id,
    topicTitle: item.topic_title,
    total: item.total,
    stage: item.stage,
    lastAttemptAt: item.last_attempt_at,
  }));
};

export const getTopicProgress = async (): Promise<TopicProgress[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(500);
    return MOCK_TOPIC_PROGRESS;
  }

  const { data, error } = await supabase.rpc('get_topic_progress');

  if (error) {
    throw error;
  }

  if (!data) throw new Error('No topic progress data');

  return mapToTopicProgress(data);
};
