import { it, expect, describe, vi, beforeEach } from 'vitest';

import { supabase } from '../supabase-client';

import { getTopics } from './index';

vi.mock('../supabase-client.ts', () => {
  return {
    supabase: {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        throwOnError: vi.fn(),
      }),
    },
  };
});

describe('getTopics method', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getTopics return topics', async () => {
    vi.mocked(
      supabase.from('topics').select('*, public_tasks(count)').order('sort_order').throwOnError
    ).mockResolvedValue({
      data: [
        {
          id: 'closures',
          title: 'Closures',
          description: 'Лексическое окружение, замыкания, IIFE',
          icon: '🔒',
          public_tasks: [{ count: 3 }],
          stage: 1,
          sort_order: null,
        },
      ],
      error: null,
      count: null,
      status: 0,
      statusText: '',
    });

    const topics = await getTopics();

    expect(Array.isArray(topics)).toBe(true);
    expect(topics[0]?.title).toBe('Closures');
    expect(topics[0]?.taskCount).toBe(3);
  });

  it('getTopics throw error', async () => {
    vi.mocked(
      supabase.from('topics').select('*, public_tasks(count)').order('sort_order').throwOnError
    ).mockRejectedValue(new Error('Error'));

    await expect(getTopics()).rejects.toThrow('Error');
  });
});
