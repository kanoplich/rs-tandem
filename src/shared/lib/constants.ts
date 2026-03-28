import {
  STAGE_1_DESCRIPTION,
  STAGE_1_TITLE,
  STAGE_2_DESCRIPTION,
  STAGE_2_TITLE,
  STAGE_3_DESCRIPTION,
  STAGE_3_TITLE,
} from './locales';

export const PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const;

export const DEFAULT_MAX_SCORE = 100;
export const MAX_DISPLAY_SCORE = DEFAULT_MAX_SCORE / 10;

export const STAGES = [
  { id: 1, title: STAGE_1_TITLE, description: STAGE_1_DESCRIPTION },
  { id: 2, title: STAGE_2_TITLE, description: STAGE_2_DESCRIPTION },
  { id: 3, title: STAGE_3_TITLE, description: STAGE_3_DESCRIPTION },
] as const;

export const DEFAULT_STAGES_VALUE = STAGES[0].id;
export const PASSING_SCORE = 70;

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const THEME_STORAGE_KEY = 'project-theme';
