import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../ui/footer';

import { AuthContext } from '@/app/providers/auth-context';
import { Header } from '@/widgets/header/header';

export const ProtectedAppLayout = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <Header user={user} signOut={signOut} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
