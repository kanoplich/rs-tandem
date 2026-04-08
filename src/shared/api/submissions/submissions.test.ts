import { it, expect, describe, vi, beforeEach } from 'vitest';

import { supabase } from '../supabase-client';

import { getSubmissionHistory } from './index';

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

describe('getSubmissionHistory method', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getSubmissionHistory return submission', async () => {
    vi.mocked(
      supabase
        .from('submissions')
        .select('*, public_tasks!task_id(title, topic_id, topics(title, stage))')
        .order('submitted_at').throwOnError
    ).mockResolvedValue({
      data: [
        {
          id: 'sub-001',
          answer: '',
          covered: null,
          feedback: null,
          judge_level: null,
          missed: null,
          score: null,
          submitted_at: '',
          task_id: 'closures-1',
          user_id: 'user-mock-01',
          public_tasks: {
            title: '',
            topic_id: '',
            topics: {
              stage: 1,
              title: 'Closures',
            },
          },
        },
      ],
      error: null,
      count: null,
      status: 0,
      statusText: '',
    });

    const submission = await getSubmissionHistory();

    expect(Array.isArray(submission)).toBe(true);
    expect(submission[0]?.id).toBe('sub-001');
    expect(submission[0]?.userId).toBe('user-mock-01');
  });

  it('getSubmissionHistory throw error', async () => {
    vi.mocked(
      supabase
        .from('submissions')
        .select('*, public_tasks!task_id(title, topic_id, topics(title, stage))')
        .order('submitted_at').throwOnError
    ).mockRejectedValue(new Error('Error'));

    await expect(getSubmissionHistory()).rejects.toThrow('Error');
  });
});
