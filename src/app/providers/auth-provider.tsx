import { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from './auth-context';

import { onAuthStateChange, getSession, signOut as signOutApi } from '@/shared/api/auth';
import type { AuthSession as Session } from '@/shared/api/index';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getSession()
      .then((initialSession) => {
        if (isMounted) {
          setSession(initialSession);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession(null);
          setIsLoading(false);
        }
      });

    const subscription = onAuthStateChange((newSession: Session | null) => {
      if (isMounted) {
        setSession(newSession);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await signOutApi();
  };

  const value = {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: !!session?.user,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
