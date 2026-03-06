import { Outlet } from 'react-router-dom';

import { Footer } from '../ui';

export const PrivateLayout = () => {
  return (
    <>
      <div>
        <h1>Header</h1>
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
