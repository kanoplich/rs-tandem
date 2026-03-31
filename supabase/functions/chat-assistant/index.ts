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
      .select('id, title, question_text, golden_answer')
      .eq('id', taskId)
      .single();

    if (currentTask) {
      contextTasks = [currentTask, ...contextTasks].slice(0, 5);
    }
  }

  const tasksContext = contextTasks
    .map(
      (t: { title: string; question_text: string; golden_answer: string }) =>
        `Task: ${t.title}\nQuestion: ${t.question_text}\nReference Answer: ${t.golden_answer}`
    )
    .join('\n---\n');

  const systemPrompt = `You are a helpful interview preparation assistant for RS School.
You help candidates understand and solve technical interview tasks.

You have access to reference answers for the tasks below. Use this knowledge
to GUIDE the user toward the correct answer, but NEVER quote or paraphrase
the reference answer directly.

RULES:
- NEVER give the direct answer or quote from the reference answer.
- Guide the user step by step toward understanding.
- If the user is stuck, give progressive hints (start vague, get more specific).
- ALWAYS respond in Russian.
- Be encouraging but honest about knowledge gaps.
- Keep responses concise and focused.

CONTEXT (reference materials — DO NOT share directly with the user):
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
