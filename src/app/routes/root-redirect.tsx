import { Navigate } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';

import { ROUTES } from '@/shared/config/routes';

export const RootRedirect = () => {
  return (
    <ProtectedRoute redirectTo={ROUTES.LANDING}>
      <Navigate to={ROUTES.DASHBOARD} replace />;
    </ProtectedRoute>
  );
};
