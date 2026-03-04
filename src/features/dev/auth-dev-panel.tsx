import { signIn, signOut } from '@/shared/api/auth';
import { viewer } from '@/shared/api/auth/mock';
import { useAuth } from '@/shared/hooks/use-auth';

export const AuthDevPanel = () => {
  const { isAuthenticated } = useAuth();

  if (import.meta.env.PROD) return null;

  const handleClick = async () => {
    if (isAuthenticated) {
      await signOut();
    } else {
      await signIn({ email: viewer.email, password: viewer.password });
    }
  };

  return (
    <div>
      <div>
        <div>Mock: {viewer.email}</div>
        <div>Status: {isAuthenticated ? '✅' : '❌'}</div>
      </div>

      <button onClick={handleClick}>{isAuthenticated ? 'Logout' : 'Login'}</button>
    </div>
  );
};
