import { Navigate, useLocation } from 'react-router-dom';

import { WARNING_WINDOWS_TEXT } from '@/app/ui/header/locales/locales';
import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="warning">{WARNING_WINDOWS_TEXT.DOWNLOAD}</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
