import { BookOpen, Trophy, Award, Zap } from 'lucide-react';

import { PROFILE_STATS_TEXT } from '../locales';

export const STATS_CARDS = [
  {
    key: 'completedTasks',
    title: PROFILE_STATS_TEXT.TOTAL_TRAININGS,
    icon: BookOpen,
  },
  {
    key: 'avgScore',
    title: PROFILE_STATS_TEXT.AVERAGE_SCORE,
    icon: Trophy,
  },
  {
    key: 'rank',
    title: PROFILE_STATS_TEXT.RANK,
    icon: Award,
  },
  {
    key: 'xp',
    title: PROFILE_STATS_TEXT.XP,
    icon: Zap,
  },
] as const;
