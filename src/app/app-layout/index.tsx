import { Outlet } from 'react-router-dom';

import { Footer } from './footer';

export const AppLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
