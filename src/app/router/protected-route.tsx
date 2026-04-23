import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/entities/session';
import { ROUTES, Loader } from '@/shared';

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
    const from = (location.state as { from?: Location })?.from;
    return <Navigate to={from ?? ROUTES.DASHBOARD} replace />;
  }

  if (!reverse && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
