import { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from './auth-context';

import { onAuthStateChange } from '@/shared/api/auth';
import type { Session } from '@/shared/types/index';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = onAuthStateChange((newSession: Session | null) => {
      setSession(newSession);
      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session?.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
