import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';

export const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div className="warning"></div>;
  }

  return <Navigate to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LANDING} replace />;
};
