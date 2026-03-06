import type { AuthSession } from '@/shared/api';

const STORAGE_KEY = 'mock_supabase_session_v1';

export const viewer = {
  email: 'test@test.com',
  password: 'Qwerty12345',
};

export const MOCK_SESSION: AuthSession = {
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

export let mockIsAuth = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
})();

const mockAuthListeners = new Set<(session: AuthSession | null) => void>();

export const addMockAuthListener = (callback: (session: AuthSession | null) => void) => {
  try {
    callback(mockIsAuth ? MOCK_SESSION : null);
  } catch {
    console.error('Failed to notify mock auth listener');
  }

  mockAuthListeners.add(callback);
  return { unsubscribe: () => mockAuthListeners.delete(callback) };
};

export const setMockIsAuth = (value: boolean) => {
  mockIsAuth = value;
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    console.error('Failed to set mock auth state');
  }

  mockAuthListeners.forEach((cb) => {
    try {
      cb(value ? MOCK_SESSION : null);
    } catch {
      console.error('Failed to notify mock auth listener');
    }
  });
};
