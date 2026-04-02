import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer } from '../ui/footer';

export const PublicLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};
