import { BookOpen, Trophy, Award, Zap } from 'lucide-react';

import { Expert, FirstStep, Perfection, StageMaster, TenWorkouts } from '../assets/icons';
import { ACHIEVEMENTS_TEXT, PROFILE_STATS_TEXT } from '../locales';

export const STATS_CARDS = [
  {
    key: 'completedTasks',
    title: PROFILE_STATS_TEXT.TOTAL_TRAININGS,
    icon: BookOpen,
    color: 'text-light',
  },
  {
    key: 'avgScore',
    title: PROFILE_STATS_TEXT.AVERAGE_SCORE,
    icon: Trophy,
    color: 'text-primary',
  },
  {
    key: 'rank',
    title: PROFILE_STATS_TEXT.RANK,
    icon: Award,
    color: 'text-success',
  },
  {
    key: 'xp',
    title: PROFILE_STATS_TEXT.XP,
    icon: Zap,
    color: 'text-light',
  },
] as const;

export const ACHIEVEMENTS = [
  { key: 'first', title: ACHIEVEMENTS_TEXT.FIRST_TRAINING, Icon: FirstStep },
  { key: 'ten', title: ACHIEVEMENTS_TEXT.TEN_TRAININGS, Icon: TenWorkouts },
  { key: 'stage', title: ACHIEVEMENTS_TEXT.STAGE_MASTER, Icon: StageMaster },
  { key: 'perfect', title: ACHIEVEMENTS_TEXT.PERFECTIONIST, Icon: Perfection },
  { key: 'expert', title: ACHIEVEMENTS_TEXT.EXPERT, Icon: Expert },
] as const;
