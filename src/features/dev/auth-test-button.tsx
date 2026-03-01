import { useState } from 'react';

import styles from './auth-test-buttons.module.css';

import { signIn, signUp, signOut } from '@/shared/api/auth';
import { useAuth } from '@/shared/lib/hooks/use-auth';

type AuthAction = 'login' | 'register' | 'logout';

export const AuthTestButtons = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState<AuthAction | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (import.meta.env.PROD) return null;

  const handleAction = async (action: AuthAction, fn: () => Promise<unknown>) => {
    setLoading(action);
    setError(null);

    try {
      await fn();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(null);
    }
  };
  return (
    <div className={styles['devTools']}>
      <div className={styles['status']}>
        <strong>Status</strong> {isAuthenticated ? '✅' : '❌'}
        {user && <div className={styles['userEmail']}>{user.email}</div>}
      </div>

      {error && <div className={styles['error']}>{error}</div>}

      <div className={styles['buttons']}>
        <button
          className={styles['button']}
          onClick={() =>
            handleAction('login', () =>
              signIn({ email: 'test@example.com', password: 'password123' })
            )
          }
          disabled={!!loading}
        >
          {loading === 'login' ? '...' : 'Login'}
        </button>
        <button
          className={styles['button']}
          onClick={() =>
            handleAction('register', () =>
              signUp({ email: 'newuser@example.com', password: 'password123' })
            )
          }
          disabled={!!loading}
        >
          {loading === 'register' ? '...' : 'Register'}
        </button>
        <button
          className={styles['button']}
          onClick={() => handleAction('logout', signOut)}
          disabled={!!loading}
        >
          {loading === 'logout' ? '...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};
