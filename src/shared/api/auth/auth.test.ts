import { it, expect, describe, vi, beforeEach } from 'vitest';

import { supabase } from '../supabase-client';

import { MOCK_SESSION } from './mock';

import { getSession } from './index';

vi.mock('../supabase-client.ts', () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn(),
      },
    },
  };
});

describe('getSession method', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getSession return session', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: MOCK_SESSION,
      },
      error: null,
    });

    const session = await getSession();

    expect(session?.user.id).toBe('00000000-0000-0000-0000-000000000001');
    expect(session?.token_type).toBe('bearer');
    expect(session?.expires_in).toBe(3600);
  });

  it('getSession throw error', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValue(new Error('Error'));

    await expect(getSession()).rejects.toThrow('Error');
  });
});
