import { RouterProvider } from 'react-router-dom';

import { AuthProvider, ErrorBoundary } from './providers';
import { router } from './router';

export const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
};
