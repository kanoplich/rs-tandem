import { useContext } from 'react';

import { NOT_WITHIN_THEME_PROVIDER_ERROR, ThemeProviderContext } from '@/shared';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error(NOT_WITHIN_THEME_PROVIDER_ERROR);

  return context;
};
