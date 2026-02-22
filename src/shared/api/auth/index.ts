import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '../supabase-client';

import type { AuthCredentials } from './types';

import { ROUTES } from '@/shared/config/routes';
import { config } from '@/shared/config/supabase';

export const getSession = async (): Promise<Session | null> => {
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
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log('AUTH EVENT:', _event, session);
    callback(session);
  });

  return subscription;
};

export const signUp = async ({ email, password }: AuthCredentials): Promise<User> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${config.HOST}${ROUTES.DASHBOARD}`,
    },
  });

  if (error || !user) {
    throw error || new Error('Error auth');
  }

  return user;
};
