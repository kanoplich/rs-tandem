import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  const { taskId, answer } = await req.json();

  if (!taskId || !answer) {
    return new Response(JSON.stringify({ error: 'taskId and answer are required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: task } = await supabase
    .from('tasks')
    .select('golden_answer, rubric_items, rubric_weights')
    .eq('id', taskId)
    .single();

  if (!task) {
    return new Response(JSON.stringify({ error: 'Task not found' }), {
      status: 404,
    });
  }

  const systemPrompt = `
ROLE: You are a strict technical interviewer.
TASK: Compare the CANDIDATE_ANSWER with the REFERENCE_ANSWER using the RUBRIC.

REFERENCE_ANSWER: ${task.golden_answer}
RUBRIC_POINTS: ${JSON.stringify(task.rubric_items)}

IMPORTANT: Respond ONLY with valid JSON:
{
  "score": <0-100>,
  "covered_points": ["point covered"],
  "missed_points": ["point missed"],
  "feedback": "Constructive feedback in Russian."
}`;

  const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: answer },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  });

  const llmData = await llmResponse.json();
  const raw = JSON.parse(llmData.choices[0].message.content);

  const authHeader = req.headers.get('Authorization')!;
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const {
    data: { user },
  } = await userClient.auth.getUser();

  await supabase.from('submissions').insert({
    user_id: user!.id,
    task_id: taskId,
    answer,
    score: raw.score,
    covered: raw.covered_points,
    missed: raw.missed_points,
    feedback: raw.feedback,
    judge_level: 1,
  });
  console.log(user);

  const result = {
    score: raw.score,
    maxScore: 100,
    coveredPoints: raw.covered_points,
    missedPoints: raw.missed_points,
    feedback: raw.feedback,
    judgeLevel: 1,
  };

  return new Response(JSON.stringify(result), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
});
