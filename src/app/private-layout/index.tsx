import { Outlet } from 'react-router-dom';

import { Footer } from '../ui';
import { Header } from '../ui/header';

export const PrivateLayout = () => {
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
