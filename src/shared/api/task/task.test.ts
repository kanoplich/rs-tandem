import { it, expect, describe, vi, beforeEach } from 'vitest';

import { supabase } from '../supabase-client';

import { getTask } from './index';

vi.mock('../supabase-client.ts', () => {
  return {
    supabase: {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        throwOnError: vi.fn(),
      }),
    },
  };
});

describe('getTask method', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getTask return task', async () => {
    vi.mocked(
      supabase.from('public_tasks').select('*').eq('id', '').single().throwOnError
    ).mockResolvedValue({
      data: {
        id: 'closures-1',
        type: 'theory_open',
        difficulty: 2,
        stage: 2,
        title: 'Что такое замыкание?',
        code_template: null,
        created_at: null,
        max_score: 100,
        question_text:
          'Объясните концепцию замыкания в JavaScript. Что происходит с переменными внешней функции после её выполнения?',
        rubric_items: [
          'Упомянул лексическое окружение',
          'Объяснил сохранение переменных во внешней области видимости',
          'Привёл корректный пример кода',
        ],
        topic_id: 'closures',
      },
      error: null,
      count: null,
      status: 0,
      statusText: '',
    });

    const task = await getTask('closures-1');

    expect(task.id).toBe('closures-1');
    expect(task.title).toBe('Что такое замыкание?');
    expect(task.maxScore).toBe(100);
  });
  it('getTask throw error', async () => {
    vi.mocked(
      supabase.from('public_tasks').select('*').eq('id', '').single().throwOnError
    ).mockRejectedValue(new Error('Error'));

    await expect(getTask('closures-1')).rejects.toThrow('Error');
  });
});
