import { LoaderCircle } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

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
    return <LoaderCircle />;
  }

  if (reverse && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (!reverse && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
