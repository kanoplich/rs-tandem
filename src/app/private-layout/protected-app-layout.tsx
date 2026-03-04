import { Outlet } from 'react-router-dom';

import { Header, Footer } from '../ui/index';

import { AuthDevPanel } from '@/features/dev/auth-dev-panel';
import { useAuth } from '@/shared/hooks/use-auth';

export const ProtectedAppLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <Header user={user} signOut={signOut} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthDevPanel />
    </>
  );
};
