import { RouterProvider } from 'react-router-dom';

import { AuthProvider, ErrorBoundary, ThemeProvider } from './providers';
import { router } from './router';

import { Toaster } from '@/shared/ui/sonner';

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>

      <Toaster />
    </ErrorBoundary>
  );
};
