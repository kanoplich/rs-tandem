import { LANDING_STATS_TEXT } from '@/pages/landing/locales/locales';

export const INTERSECTION_OBSERVER_THRESHOLD = 0.1;
export const INTERSECTION_OBSERVER_THRESHOLD_FEATURES = 0.08;
export const ANIMATION_DELAYS = {
  STEP: 100,
  HEADER_TEXT: 300,
  IMAGE: 400,
  BUTTONS: 500,
  SUCCESS_BADGE: 1000,
  FEATURE_CARD: 100,
} as const;
export const LANDING_STATS = [
  { value: '1000+', label: LANDING_STATS_TEXT.STUDENTS },
  { value: '37', label: LANDING_STATS_TEXT.TOPICS },
  { value: '3', label: LANDING_STATS_TEXT.STAGES },
];
