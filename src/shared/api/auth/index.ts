import type { Session } from '@supabase/supabase-js';

import { supabase } from '../supabase-client';

import { addMockAuthListener, MOCK_SESSION, mockIsAuth, setMockIsAuth } from './mock';
import type { AuthCredentials } from './types';

import { ROUTES } from '@/shared/config/routes';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE, HOST } = config;

export const getSession = async (): Promise<Session | null> => {
  if (USE_MOCK_SUPABASE) {
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

export const onAuthStateChange = (callback: (session: Session | null) => void) => {
  if (USE_MOCK_SUPABASE) {
    callback(mockIsAuth ? MOCK_SESSION : null);
    return addMockAuthListener(callback);
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return subscription;
};

export const signUp = async (
  p0: string,
  p1: string,
  p2: { username: string },
  { email, password }: AuthCredentials
): Promise<Session> => {
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
    },
  });

  if (error || !session) {
    throw error || new Error('SingUp error');
  }

  return session;
};

export const signIn = async (
  p0: string,
  p1: string,
  { email, password }: AuthCredentials
): Promise<Session> => {
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
    throw error || new Error('SingIn error');
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

  if (error) {
    throw error;
  }
};
