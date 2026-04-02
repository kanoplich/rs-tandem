import { supabase } from '../supabase-client';

import { MOCK_JUDGE_RESULT_GOOD } from './mock';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

export const evaluateTheory = async (
  taskId: string,
  answer: string
): Promise<ReadableStreamDefaultReader> => {
  if (config.USE_MOCK_AI) {
    await delay(800);
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(MOCK_JUDGE_RESULT_GOOD.feedback));
        controller.close();
      },
    });
    return stream.getReader();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('User is not authenticated');

  const response = await fetch(`${config.SUPABASE_URL}/functions/v1/judge`, {
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
