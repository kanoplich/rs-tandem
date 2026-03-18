import { RouterProvider } from 'react-router-dom';

import { AuthProvider, ErrorBoundary } from './providers';
import { router } from './router';

import { Toaster } from '@/shared/ui/sonner';

export const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

      <Toaster />
    </ErrorBoundary>
  );
};
