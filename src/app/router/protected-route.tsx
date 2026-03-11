import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '../ui/loader';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  reverse?: boolean;
}

export const ProtectedRoute = ({ children, reverse = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader loading={true} />;
  }

  if (reverse && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (!reverse && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
