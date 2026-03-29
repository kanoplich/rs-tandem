export * from './config/routes';

export { useTheme } from './hooks/use-theme';

export * from './ui';

export {
  PROVIDERS,
  DEFAULT_MAX_SCORE,
  STAGES,
  DEFAULT_STAGES_VALUE,
  PASSING_SCORE,
  THEMES,
  THEME_STORAGE_KEY,
  type Theme,
} from './lib/constants';

export { getProgressPercent } from './lib/get-progress-percent';
export { isTopicCompleted } from './lib/is-topic-completed';
export { formatScore } from './lib/format-score';
export { groupByStage } from './lib/group-by-stage';
export { getTopicStats } from './lib/get-topic-stats';
export { NOT_WITHIN_THEME_PROVIDER_ERROR } from './lib/locales';
export { ThemeProviderContext } from './model/theme/theme-context';
