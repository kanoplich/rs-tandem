import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { signIn } from '@/shared/api/auth';
import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/lib/hooks/use-auth';
import { LOGIN_INPUT_TEXT } from '@/shared/ui/i18n/login-forms';

export const Login = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>{LOGIN_INPUT_TEXT.ENTER}</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            {LOGIN_INPUT_TEXT.EMAIL}
            <input name="email" type="email" placeholder="Email" required disabled={isLoading} />
          </label>
        </div>

        <div>
          <label>
            {LOGIN_INPUT_TEXT.PASSWORD}
            <input
              name="password"
              type="password"
              placeholder={LOGIN_INPUT_TEXT.PASSWORD}
              required
              disabled={isLoading}
            />
          </label>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};
