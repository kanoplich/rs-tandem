import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '../layout';

import { Dashboard } from '@/pages/dashboard';
import { History } from '@/pages/history';
import { Landing } from '@/pages/landing';
import { Login } from '@/pages/login';
import { NotFound } from '@/pages/not-found';
import { Profile } from '@/pages/profile';
import { Register } from '@/pages/register';
import { Task } from '@/pages/task';
import { Topics } from '@/pages/topics';
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
