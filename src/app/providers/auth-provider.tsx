import { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from './auth-context';

import type { AuthSession as Session } from '@/shared/api';
import { onAuthStateChange, getSession } from '@/shared/api';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentSession = await getSession();
        setSession(currentSession);
      } catch (error) {
        console.error('Error getting session:', error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = onAuthStateChange((newSession) => {
      setSession(newSession);
    });

    initializeAuth();

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
