import { Outlet } from 'react-router-dom';

import { Footer } from '../ui/footer';

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
