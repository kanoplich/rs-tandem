import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { corsHeaders } from '../_shared/cors.ts';
import { errorResponse } from '../_shared/error-response.ts';

const HISTORY_CHAR_BUDGET = 8000;

interface ChatRequest {
  message: string;
  taskId?: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let body: ChatRequest;

  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  const { message, taskId, history } = body;

  if (!message) return errorResponse('Message is required', 400);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return errorResponse('Authorization header is required', 401);

  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const {
    data: { user },
  } = await userClient.auth.getUser();

  if (!user) return errorResponse('Unauthorized', 401);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) return errorResponse('OPENAI_API_KEY not configured', 500);

  const groqKey = Deno.env.get('GROQ_API_KEY');
  if (!groqKey) return errorResponse('GROQ_API_KEY not configured', 500);

  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: message,
    }),
  });

  if (!embeddingResponse.ok) {
    const errorText = await embeddingResponse.text();
    console.error('OpenAI embedding failed:', errorText);
    return errorResponse('Failed to generate embedding', 500);
  }

  const embeddingData = await embeddingResponse.json();
  const queryEmbedding = embeddingData.data[0].embedding;

  const { data: matchedTasks, error: matchError } = await supabase.rpc('match_tasks', {
    query_embedding: queryEmbedding,
    match_threshold: 0.35,
    match_count: 3,
  });

  if (matchError) {
    console.error('match_tasks error:', matchError);
    return errorResponse('Vector search failed', 500);
  }

  let contextTasks = matchedTasks || [];

  if (taskId && !contextTasks.some((t: { id: string }) => t.id === taskId)) {
    const { data: currentTask } = await supabase
      .from('tasks')
      .select('id, title, question_text, golden_answer, rubric_items')
      .eq('id', taskId)
      .single();

    if (currentTask) {
      contextTasks = [currentTask, ...contextTasks].slice(0, 5);
    }
  }

  const tasksContext = contextTasks
    .map((t: { title: string; question_text: string; rubric_items?: string[] }) => {
      const points = (t.rubric_items || [])
        .map((item: string, i: number) => `  ${i + 1}. ${item}`)
        .join('\n');
      return `Task: ${t.title}\nQuestion: ${t.question_text}\nKey points student must cover:\n${points}`;
    })
    .join('\n---\n');

  const systemPrompt = `You are a MENTOR preparing a student for a technical interview at RS School.

YOUR GOAL: Guide the student so they can answer the interview question themselves, covering ALL key points from the reference answer.

HOW TO WORK:
1. The reference answer contains key points the student must cover. Track which points the student has addressed and which are still missing.
2. Start by asking the student what they already know about the topic.
3. For each key point the student hasn't covered:
   - Give a short hint or a leading question that nudges them toward that point.
   - If they can't answer after a hint — explain briefly (2-3 sentences) with a simple example, then ask them to rephrase in their own words.
4. When the student covers a point — confirm it ("Exactly right!") and move to the next missing point.
5. At the end — summarize which points they covered well and which need more practice.

RULES:
- NEVER write the full answer. Your job is to help them BUILD the answer piece by piece.
- If the user says "write the answer for me" — refuse, but immediately give a hint on the first key point to get them started.
- Mix hints, short explanations, examples, and questions. Don't just ask questions endlessly.
- ALWAYS respond in Russian.
- Be supportive and encouraging. Celebrate progress.
- Keep each response focused on ONE key point at a time.

KEY POINTS the student must cover (use to guide, NEVER list all at once):
---
${tasksContext}
---`;

  const messages = [{ role: 'system', content: systemPrompt }];

  if (history && history.length > 0) {
    const recentHistory = history.slice(-10);
    let totalChars = 0;
    const budgetedHistory = [];

    for (let i = recentHistory.length - 1; i >= 0; i--) {
      const msg = recentHistory[i];
      totalChars += msg.content.length;
      if (totalChars > HISTORY_CHAR_BUDGET) break;
      budgetedHistory.unshift(msg);
    }

    for (const msg of budgetedHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }
  }

  messages.push({ role: 'user', content: message });

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${groqKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.4,
      stream: true,
      max_tokens: 1000,
    }),
  });

  if (!groqResponse.ok) {
    const errorText = await groqResponse.text();
    console.error('Groq request failed:', errorText);
    return errorResponse('LLM request failed', 500);
  }

  const stream = new ReadableStream({
    async start(controller) {
      if (!groqResponse.body) return controller.close();

      const reader = groqResponse.body.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      let sseBuffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value);

        const lines = sseBuffer.split('\n');
        sseBuffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;

          const json = line.replace('data:', '').trim();
          if (json === '[DONE]') continue;

          try {
            const parsed = JSON.parse(json);
            const token = parsed.choices?.[0]?.delta?.content;

            if (token) {
              controller.enqueue(encoder.encode(token));
            }
          } catch (e) {
            console.error('Failed to parse Groq chunk:', e);
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
});
