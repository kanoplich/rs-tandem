import { supabase } from '../supabase-client';

import { MOCK_JUDGE_RESULT_GOOD } from './mock';
import type { JudgeResult } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

export const evaluateTheory = async (
  taskId: string,
  answer: string,
  mode: 'stream' | 'json' = 'json'
): Promise<JudgeResult | ReadableStreamDefaultReader<Uint8Array>> => {
  if (config.USE_MOCK_AI) {
    await delay(800);

    if (mode === 'json') return MOCK_JUDGE_RESULT_GOOD;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for (const char of MOCK_JUDGE_RESULT_GOOD.feedback) {
          controller.enqueue(encoder.encode(char));
          await new Promise((r) => setTimeout(r, 10));
        }
        controller.close();
      },
    });
    return stream.getReader();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('User not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/judge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ taskId, answer, mode }),
  });

  if (!response.body) throw new Error('No response body from judge function');

  if (mode === 'stream') {
    return response.body.getReader();
  }

  const result = await response.json();
  return result as JudgeResult;
};
