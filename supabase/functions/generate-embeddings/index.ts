import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { corsHeaders } from '../_shared/cors.ts';
import { errorResponse } from '../_shared/error-response.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return errorResponse('Authorization required', 401);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) {
    return errorResponse('OPENAI_API_KEY not configured', 500);
  }

  const { data: topics, error: topicsError } = await supabase
    .from('topics')
    .select('id, title, description');

  if (topicsError) {
    return errorResponse(`Failed to fetch topics: ${topicsError.message}`, 500);
  }

  const topicsMap = new Map(
    topics.map((t: { id: string; title: string; description: string }) => [t.id, t])
  );

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('id, topic_id, title, type, difficulty, question_text, golden_answer');

  if (tasksError) {
    return errorResponse(`Failed to fetch tasks: ${tasksError.message}`, 500);
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
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
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
        errors.push(`Task ${task.id}: DB update error - ${updateError.message}`);
        failed++;
        continue;
      }

      updated++;
    } catch (err) {
      errors.push(`Task ${task.id}: ${err.message}`);
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
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
});
