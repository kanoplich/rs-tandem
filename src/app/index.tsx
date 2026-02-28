import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './providers/auth-provider';
import { router } from './router';

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
};
