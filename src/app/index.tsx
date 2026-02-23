import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import { getSession, onAuthStateChange } from '@/shared/api';

export const App = () => {
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        await getSession();
      } catch (error: unknown) {
        console.error('Error loading session:', error);
      }
    };
    getInitialSession();
    const subscription = onAuthStateChange((session) => {
      console.log(`session changed`, session);
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <RouterProvider router={router} />;
};
