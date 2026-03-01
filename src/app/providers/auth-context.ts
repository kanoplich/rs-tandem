import { createContext } from 'react';

import type { AuthContextValue } from '@/shared/types/auth';

const INITIAL_STATE: AuthContextValue = {
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
};

export const AuthContext = createContext<AuthContextValue>(INITIAL_STATE);
