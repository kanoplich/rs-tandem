import type { AuthUser } from '../auth/types';
import { supabase } from '../supabase-client';

export const updateUser = async (email: string): Promise<AuthUser | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    email,
  });

  if (error || !user) {
    throw error || new Error('Failed to get user data');
  }

  return user;
};

export const updateUserPassword = async (password: string): Promise<AuthUser | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    password,
  });

  if (error || !user) {
    throw error || new Error('Failed to update password');
  }

  return user;
};

export const getUser = async (): Promise<AuthUser | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Failed to get user data');
  }

  return user;
};
