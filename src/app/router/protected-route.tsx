import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';
import { Loader } from '@/shared/ui/loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  reverse?: boolean;
}

export const ProtectedRoute = ({ children, reverse = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (reverse && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (!reverse && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
