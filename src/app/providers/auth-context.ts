import { createContext } from 'react';

import type { AuthSession, AuthUser } from '@/shared/api';

export interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const INITIAL_STATE: AuthState = {
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);
