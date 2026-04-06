import { createBrowserRouter } from 'react-router-dom';

import { PrivateLayout } from '@/app/private-layout';
import { PublicLayout } from '@/app/public-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import {
  Dashboard,
  Forgot,
  History,
  Landing,
  Login,
  NotFound,
  Profile,
  Register,
  Reset,
  Task,
  Topics,
} from '@/pages';
import { ROUTES } from '@/shared';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute reverse>
            <Landing />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <ProtectedRoute reverse>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <ProtectedRoute reverse>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.FORGOT,
        element: (
          <ProtectedRoute reverse>
            <Forgot />
          </ProtectedRoute>
        ),
      },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
      {
        path: ROUTES.RESET,
        element: (
          <ProtectedRoute>
            <Reset />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <PrivateLayout />
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
