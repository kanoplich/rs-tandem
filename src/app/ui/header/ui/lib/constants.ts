import { House, BookOpen, History, User } from 'lucide-react';

import { MENU_LINK_TEXT } from '../../locales';

import { ROUTES } from '@/shared';

export const MENU_LINKS = [
  {
    to: ROUTES.DASHBOARD,
    label: MENU_LINK_TEXT.DASHBOARD,
    icon: House,
  },
  {
    to: ROUTES.TOPICS,
    label: MENU_LINK_TEXT.TOPICS,
    icon: BookOpen,
  },
  {
    to: ROUTES.HISTORY,
    label: MENU_LINK_TEXT.HISTORY,
    icon: History,
  },
  {
    to: ROUTES.PROFILE,
    label: MENU_LINK_TEXT.PROFILE,
    icon: User,
  },
];
