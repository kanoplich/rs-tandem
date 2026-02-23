import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '../supabase-client';

import { MOCK_SESSION, mockIsAuth, setMockIsAuth } from './mock';
import type { AuthCredentials } from './types';

import { ROUTES } from '@/shared/config/routes';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

export const getSession = async (): Promise<Session | Partial<Session> | null> => {
  if (config.USE_MOCK_SUPABASE) {
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

export const onAuthStateChange = (
  callback: (session: Session | Partial<Session> | null) => void
) => {
  if (config.USE_MOCK_SUPABASE) {
    callback(mockIsAuth ? MOCK_SESSION : null);
    return;
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return subscription;
};

export const singIn = async ({
  email,
  password,
}: AuthCredentials): Promise<Session | Partial<Session>> => {
  if (config.USE_MOCK_SUPABASE) {
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
    throw error || new Error('Auth error');
  }

  return session;
};

export const signUp = async ({
  email,
  password,
}: AuthCredentials): Promise<Session | Partial<Session>> => {
  if (config.USE_MOCK_SUPABASE) {
    console.log('Mock singUp');
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
      emailRedirectTo: `${config.HOST}${ROUTES.DASHBOARD}`,
    },
  });

  if (error || !session) {
    throw error || new Error('Error auth');
  }

  return session;
};

export const singOut = async (): Promise<void> => {
  if (config.USE_MOCK_SUPABASE) {
    await delay(400);
    setMockIsAuth(false);
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
