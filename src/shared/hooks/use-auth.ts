import { useContext } from 'react';

import { AuthContext } from '@/app/providers/auth-context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
