import { useEffect, useState, type ReactNode } from 'react';

import { THEMES, type Theme, THEME_STORAGE_KEY } from '@/shared';
import { ThemeProviderContext } from '@/shared';

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

    // Определяем, нужно ли включить темную тему
    const isDark =
      theme === THEMES.DARK ||
      (theme === THEMES.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);

    root.classList.toggle(THEMES.DARK, isDark);
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
