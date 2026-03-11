import type { Session, User } from '@supabase/supabase-js';

export type AuthSession = Session;
export type AuthUser = User;

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  first_name: string;
};
