import { Outlet } from 'react-router-dom';

import { Header } from '../ui';
import { Footer } from '../ui/footer';

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
