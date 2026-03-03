import { createBrowserRouter } from 'react-router-dom';

import { ProtectedAppLayout } from '@/app/private-layout/protected-layout';
import { AppLayout } from '@/app/public-layout';
import { ProtectedRoute } from '@/app/routes/protected-route';
import { RootRedirect } from '@/app/routes/root-redirect';
import {
  Dashboard,
  History,
  Landing,
  Login,
  NotFound,
  Profile,
  Register,
  Task,
  Topics,
} from '@/pages';
import { ROUTES } from '@/shared/config/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootRedirect />,
  },
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.LANDING, element: <Landing /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
  {
    path: ROUTES.APP,
    element: (
      <ProtectedRoute>
        <ProtectedAppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.TOPICS, element: <Topics /> },
      { path: ROUTES.TASK, element: <Task /> },
      { path: ROUTES.HISTORY, element: <History /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
]);
