import { RouterProvider } from 'react-router-dom';

import { AppLayout } from './layout';
import { router } from './router';

export const App = () => {
  return (
    <>
      <h1>Start App</h1>
      <AppLayout />
      <RouterProvider router={router} />
    </>
  );
};
