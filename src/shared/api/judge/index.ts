import { supabase } from '../supabase-client';

import { MOCK_JUDGE_RESULT_GOOD } from './mock';

import { config } from '@/shared/config/supabase';

export const evaluateTheory = async (
  taskId: string,
  answer: string
): Promise<ReadableStreamDefaultReader> => {
  if (config.USE_MOCK_AI) {
    return MOCK_JUDGE_RESULT_GOOD;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('User is not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/judge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ taskId, answer }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Judge request failed:', errorText);
    throw new Error('Judge request failed');
  }

  if (!response.body) throw new Error('No stream returned');

  return response.body.getReader();
};
