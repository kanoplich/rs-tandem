import type { Session } from '@supabase/supabase-js';

import { supabase } from '../supabase-client';

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
