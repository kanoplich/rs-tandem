import { it, expect, describe, vi, beforeEach } from 'vitest';

import { supabase } from '../supabase-client';

import { getDashboardStats } from './index';

vi.mock('../supabase-client.ts', () => {
  return {
    supabase: {
      rpc: vi.fn(),
    },
  };
});

describe('getDashboardStats method', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getDashboardStats return userStats', async () => {
    vi.mocked(supabase.rpc<'get_user_stats'>).mockResolvedValue({
      data: [{ completed_tasks: 2, rank: 'Junior', streak: 4, total_tasks: 10, xp: 340 }],
      error: null,
      count: null,
      status: 0,
      statusText: '',
    });

    const userStats = await getDashboardStats();

    expect(supabase.rpc<'get_user_stats'>).toHaveBeenCalledWith('get_user_stats');
    expect(userStats.xp).toBe(340);
    expect(userStats.rank).toBe('Junior');
  });

  it('getDashboardStats throw error', async () => {
    vi.mocked(supabase.rpc<'get_user_stats'>).mockRejectedValue(new Error('Error'));

    await expect(getDashboardStats()).rejects.toThrow('Error');
  });
});
