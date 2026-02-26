import { supabase } from '../supabase-client';

import { MOCK_JUDGE_RESULT } from './mock';
import type { JudgeResult } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

// src/services/judge-level0.ts (клиентская реализация для dev)

const evaluateLevel0 = (answer: string, rubricItems: string[]): JudgeResult => {
  const answerLower = answer.toLowerCase();
  const covered: string[] = [];
  const missed: string[] = [];

  const keywordMap: Record<string, string[]> = {
    'Упомянул лексическое окружение': ['лексическ', 'lexical', 'scope', 'окружени'],
    'Объяснил сохранение переменных': ['сохран', 'запомин', 'remember', 'persist'],
    'Привёл корректный пример': ['function', 'const', 'let', 'return', '()'],
    'Упомянул практическое применение': ['приватн', 'private', 'counter', 'каррир', 'curry'],
  };

  for (const item of rubricItems) {
    const keywords = keywordMap[item] || [];
    const found = keywords.some((kw) => answerLower.includes(kw));
    if (found) covered.push(item);
    else missed.push(item);
  }

  const score = Math.round((covered.length / rubricItems.length) * 100);

  return {
    score,
    maxScore: 100,
    coveredPoints: covered,
    missedPoints: missed,
    feedback:
      score >= 80
        ? 'Отличный ответ! Покрыты основные критерии.'
        : `Неплохо, но стоит раскрыть: ${missed.join(', ')}.`,
    judgeLevel: 0,
  };
};

export const evaluateTheory = async (taskId: string, answer: string): Promise<JudgeResult> => {
  if (config.USE_MOCK_AI) {
    await delay(800);
    return MOCK_JUDGE_RESULT;
  }

  if (config.JUDGE_LEVEL === 0) {
    // Level 0: клиентский keyword matching (без Edge Function)
    // const task = await getTask(taskId);
    // return evaluateLevel0(answer, task.rubricItems);
  }

  const { data, error } = await supabase.functions.invoke('judge', {
    body: { taskId, answer },
  });

  if (error) throw error;
  return data as JudgeResult;
};

export async function getHint(
  taskId: string,
  hintLevel: number
): Promise<{ hint: string; level: number }> {
  if (config.USE_MOCK_AI) {
    await delay(300);
    return { hint: 'Подумай о лексическом окружении...', level: hintLevel };
  }

  const { data, error } = await supabase.functions.invoke('hint', {
    body: { taskId, hintLevel },
  });

  if (error) throw error;
  return data;
}
