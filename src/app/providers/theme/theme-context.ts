import { createContext } from 'react';

import { THEMES } from './locales';

export type Theme = (typeof THEMES)[keyof typeof THEMES];

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: THEMES.SYSTEM,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
