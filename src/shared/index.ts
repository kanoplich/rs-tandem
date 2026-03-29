export * from './config/routes';

export * from './ui';

export {
  PROVIDERS,
  DEFAULT_MAX_SCORE,
  STAGES,
  DEFAULT_STAGES_VALUE,
  PASSING_SCORE,
  MAX_DISPLAY_SCORE,
} from './lib/constants';

export { getProgressPercent } from './lib/get-progress-percent';
export { isTopicCompleted } from './lib/is-topic-completed';
export { formatScore } from './lib/format-score';
export { groupByStage } from './lib/group-by-stage';
export { getTopicStats } from './lib/get-topic-stats';

export { getSubmissionHistory } from './api/submissions/index';
export type { Submission } from './api/submissions/types';
