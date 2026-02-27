// supabase/functions/judge/index.ts

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

  // Создаём клиент с сервисным ключом (обходит RLS)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Получаем секретные данные задачи (golden_answer)
  // const { data: task } = await supabase
  //   .from('tasks')
  //   .select('golden_answer, rubric_items, rubric_weights')
  //   .eq('id', taskId)
  //   .single();

  // if (!task) {
  //   return new Response(JSON.stringify({ error: 'Task not found' }), {
  //     status: 404,
  //   });
  // }

  //   REFERENCE_ANSWER: ${task.golden_answer}
  // RUBRIC_POINTS: ${JSON.stringify(task.rubric_items)}

  // Вызываем Groq API
  const systemPrompt = `
ROLE: You are a strict technical interviewer.
TASK: Compare the CANDIDATE_ANSWER with the REFERENCE_ANSWER using the RUBRIC.


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

  // Сохраняем submission
  const authHeader = req.headers.get('Authorization')!;
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const {
    data: { user },
  } = await userClient.auth.getUser();

  // await supabase.from('submissions').insert({
  //   user_id: user!.id,
  //   task_id: taskId,
  //   answer,
  //   score: raw.score,
  //   covered: raw.covered_points,
  //   missed: raw.missed_points,
  //   feedback: raw.feedback,
  //   judge_level: 1,
  // });
  console.log(user);

  const result: JudgeResult = {
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

//Советы Supabase

// // supabase/functions/judge/index.ts

// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// // CORS headers — укажите конкретные origin для продакшна
// const corsHeaders = {
//   'Access-Control-Allow-Origin': 'http://localhost:5174',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
//   'Access-Control-Allow-Credentials': 'true',
// };

// console.info('judge function up');

// Deno.serve(async (req: Request) => {
//   // Ответ на preflight
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { status: 204, headers: corsHeaders });
//   }

//   try {
//     const { taskId, answer } = await req.json();

//     // Создаём клиент с сервисным ключом (обходит RLS)
//     const supabase = createClient(
//       Deno.env.get('SUPABASE_URL')!,
//       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
//     );

//     // TODO: получить task из БД (раскомментируйте если нужно)
//     // const { data: task } = await supabase
//     //   .from('tasks')
//     //   .select('golden_answer, rubric_items, rubric_weights')
//     //   .eq('id', taskId)
//     //   .single();

//     // Вызов LLM
//     const systemPrompt = `
// ROLE: You are a strict technical interviewer.
// TASK: Compare the CANDIDATE_ANSWER with the REFERENCE_ANSWER using the RUBRIC.

// IMPORTANT: Respond ONLY with valid JSON:
// {
//   "score": <0-100>,
//   "covered_points": ["point covered"],
//   "missed_points": ["point missed"],
//   "feedback": "Constructive feedback in Russian."
// }`;

//     const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'llama-3.3-70b-versatile',
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: answer },
//         ],
//         temperature: 0.3,
//         response_format: { type: 'json_object' },
//       }),
//     });

//     const llmData = await llmResponse.json();
//     const raw = JSON.parse(llmData.choices[0].message.content);

//     // Получаем текущего пользователя через anon ключ + Authorization из запроса
//     const authHeader = req.headers.get('Authorization') ?? '';
//     const userClient = createClient(
//       Deno.env.get('SUPABASE_URL')!,
//       Deno.env.get('SUPABASE_ANON_KEY')!,
//       { global: { headers: { Authorization: authHeader } } }
//     );
//     const {
//       data: { user },
//     } = await userClient.auth.getUser();

//     console.log('user:', user);

//     // Сохранять submission можно тут (раскомментируйте при необходимости)
//     // await supabase.from('submissions').insert({ ... });

//     const result = {
//       score: raw.score,
//       maxScore: 100,
//       coveredPoints: raw.covered_points,
//       missedPoints: raw.missed_points,
//       feedback: raw.feedback,
//       judgeLevel: 1,
//     };

//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   } catch (err) {
//     console.error(err);
//     const body = { error: (err as Error).message ?? 'Internal error' };
//     return new Response(JSON.stringify(body), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });
