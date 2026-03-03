import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';
import { WARNING_WINDOWS_TEXT } from '@/shared/ui/i18n/header-form';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="warning">{WARNING_WINDOWS_TEXT.DOWNLOAD}</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
