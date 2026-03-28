import { useContext } from 'react';

import { THEMES_ERRORS, ThemeProviderContext } from '@/app/providers/';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error(THEMES_ERRORS.NOT_WITHIN_THEME_PROVIDER);

  return context;
};
