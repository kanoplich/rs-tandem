import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/app/app-layout';
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
    element: <AppLayout />,
    children: [
      { path: ROUTES.LANDING, element: <Landing /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.TOPICS, element: <Topics /> },
      { path: ROUTES.TASK, element: <Task /> },
      { path: ROUTES.HISTORY, element: <History /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
]);
