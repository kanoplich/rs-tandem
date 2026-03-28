import { useEffect, useState, type ReactNode } from 'react';

import { THEMES, type Theme, THEME_STORAGE_KEY, ThemeProviderContext } from '@/shared';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({ children, defaultTheme = THEMES.DARK }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    const isDark = theme === THEMES.DARK;

    root.classList.remove(THEMES.LIGHT, THEMES.DARK);
    root.classList.add(isDark ? THEMES.DARK : THEMES.LIGHT);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}
