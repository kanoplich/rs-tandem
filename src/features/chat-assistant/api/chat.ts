import { MOCK_RESPONSE } from '../lib/mock';
import type { ChatParams } from '../lib/types';

import { supabase } from '@/shared/api/supabase-client';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

export const sendChatMessage = async ({
  message,
  taskId,
  history,
}: ChatParams): Promise<ReadableStreamDefaultReader> => {
  if (config.USE_MOCK_AI) {
    await delay(800);
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(MOCK_RESPONSE));
        controller.close();
      },
    });
    return stream.getReader();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('User is not authenticated');

  const response = await fetch(`${config.SUPABASE_URL}/functions/v1/chat-assistant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ message, taskId, history }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Chat request failed:', errorText);
    throw new Error('Chat request failed');
  }

  if (!response.body) throw new Error('No stream returned');

  return response.body.getReader();
};
