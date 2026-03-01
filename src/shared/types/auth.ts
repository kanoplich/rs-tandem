import type { Session as SupabaseSession, User as SupabaseUser } from '@supabase/supabase-js';

import type { Profile } from './database.types';

export interface User extends SupabaseUser {
  username?: string;
  avatar?: string | null;
  profile?: Profile | null;
}

export interface Session extends Omit<SupabaseSession, 'user'> {
  user: User | null;
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}
