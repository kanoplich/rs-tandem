import { LoaderCircle } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  reverse?: boolean;
}

export const ProtectedRoute = ({
  children,
  redirectTo = ROUTES.LOGIN,
  reverse = false,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || redirectTo;

  if (isLoading) {
    return <LoaderCircle />;
  }

  if (reverse) {
    return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <>{children}</>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={from} replace />;
};
