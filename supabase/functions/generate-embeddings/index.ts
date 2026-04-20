import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { API_ENDPOINTS } from '../_shared/api-endpoints.ts';
import { getCorsHeaders } from '../_shared/cors.ts';
import { errorResponse } from '../_shared/error-response.ts';
import { ERROR_CODES, HTTP_STATUS } from '../_shared/errors.ts';
import { logger } from '../_shared/logger.ts';

let isRunning = false;

serve(async (req) => {
  const origin = req.headers.get('Origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (isRunning) {
    return errorResponse(
      ERROR_CODES.CONCURRENT_REQUEST.message,
      ERROR_CODES.CONCURRENT_REQUEST.status,
      origin
    );
  }

  isRunning = true;

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return errorResponse(
        ERROR_CODES.OPENAI_API_KEY_MISSING.message,
        ERROR_CODES.OPENAI_API_KEY_MISSING.status,
        origin
      );
    }

    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('id, title, description');

    if (topicsError) {
      return errorResponse(
        `Failed to fetch topics: ${topicsError.message}`,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        origin
      );
    }

    const topicsMap = new Map(
      topics.map((t: { id: string; title: string; description: string }) => [t.id, t])
    );

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('id, topic_id, title, type, difficulty, question_text, golden_answer')
      .is('embedding', null);

    if (tasksError) {
      return errorResponse(
        `Failed to fetch tasks: ${tasksError.message}`,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        origin
      );
    }

    let updated = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const task of tasks) {
      const topic = topicsMap.get(task.topic_id) as
        | { title: string; description: string }
        | undefined;

      const text = [
        topic ? `Topic: ${topic.title} - ${topic.description || ''}` : '',
        `Task: ${task.title} | Type: ${task.type} | Difficulty: ${task.difficulty || 0}/5`,
        `Question: ${task.question_text}`,
        `Answer: ${task.golden_answer}`,
      ]
        .filter(Boolean)
        .join('\n');

      try {
        const embeddingResponse = await fetch(API_ENDPOINTS.OPENAI.EMBEDDINGS, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: text,
          }),
        });

        if (!embeddingResponse.ok) {
          const errorText = await embeddingResponse.text();
          logger.error('OpenAI embedding failed', { error: errorText, taskId: task.id });
          errors.push(`Task ${task.id}: OpenAI error - ${errorText}`);
          failed++;
          continue;
        }

        const { data } = await embeddingResponse.json();
        const embedding = data[0].embedding;

        const { error: updateError } = await supabase
          .from('tasks')
          .update({ embedding })
          .eq('id', task.id);

        if (updateError) {
          logger.error('Task update failed', { error: updateError.message, taskId: task.id });
          errors.push(`Task ${task.id}: DB update error - ${updateError.message}`);
          failed++;
          continue;
        }

        updated++;
      } catch (error) {
        logger.error('Task processing failed', { error, taskId: task.id });
        errors.push(`Task ${task.id}: ${error}`);
        failed++;
      }
    }

    return new Response(
      JSON.stringify({
        total: tasks.length,
        updated,
        failed,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        status: HTTP_STATUS.OK,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } finally {
    isRunning = false;
  }
});
