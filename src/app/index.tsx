import { RouterProvider } from 'react-router-dom';

import { AuthProvider, ErrorBoundary, ThemeProvider } from './providers';
import { THEMES } from './providers/theme/locales';
import { router } from './router';

import { Toaster } from '@/shared/ui/sonner';

export const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme={THEMES.DARK} storageKey="project-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>

      <Toaster />
    </ErrorBoundary>
  );
};
