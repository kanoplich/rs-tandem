import type { Session } from '@supabase/supabase-js';

export const viewer = {
  email: 'test@test.com',
  password: 'qwerty',
};

export let mockIsAuth = false;

export const MOCK_SESSION: Partial<Session> = {
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  user: {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'user@example.com',
    phone: '',
    app_metadata: {},

    user_metadata: {},

    aud: 'authenticated',
    confirmation_sent_at: '',
    created_at: new Date().toISOString(),

    last_sign_in_at: new Date().toISOString(),

    role: 'authenticated',
  },
};

export const setMockIsAuth = (value: boolean) => {
  mockIsAuth = value;
};
