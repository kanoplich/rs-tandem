import type { Provider } from '@supabase/supabase-js';

import { supabase } from '../supabase-client';

import { addMockAuthListener, MOCK_SESSION, mockIsAuth, setMockIsAuth } from './mock';
import type { AuthCredentials, AuthSession, RegisterCredentials } from './types';

import { ROUTES } from '@/shared/config/routes';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE, HOST } = config;

export const getSession = async (): Promise<AuthSession | null> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return mockIsAuth ? MOCK_SESSION : null;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
};

export const onAuthStateChange = (callback: (session: AuthSession | null) => void) => {
  if (USE_MOCK_SUPABASE) {
    return addMockAuthListener(callback);
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return subscription;
};

export const signUp = async ({
  email,
  password,
  first_name,
}: RegisterCredentials): Promise<AuthSession> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    setMockIsAuth(true);
    return MOCK_SESSION;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${HOST}${ROUTES.DASHBOARD}`,
      data: {
        first_name,
      },
    },
  });

  if (error || !session) {
    throw error || new Error('SignUp error');
  }

  return session;
};

export const signIn = async ({ email, password }: AuthCredentials): Promise<AuthSession> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    setMockIsAuth(true);
    return MOCK_SESSION;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !session) {
    throw error || new Error('SignIn error');
  }

  return session;
};

export const signOut = async (): Promise<void> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    setMockIsAuth(false);
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const signInWithOAuth = async (provider: Provider): Promise<void> => {
  if (USE_MOCK_SUPABASE) {
    await delay(800);
    setMockIsAuth(true);
    return;
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${HOST}${ROUTES.DASHBOARD}`,
    },
  });

  if (error) throw error;
};
