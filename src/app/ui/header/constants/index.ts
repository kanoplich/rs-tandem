import { House, BookOpen, History, User } from 'lucide-react';

import { HEADER_LINK_TEXT } from '../locales';

export const HEADER_LINKS = [
  {
    to: '/dashboard',
    label: HEADER_LINK_TEXT.DASHBOARD,
    icon: House,
  },
  {
    to: '/topics',
    label: HEADER_LINK_TEXT.TOPICS,
    icon: BookOpen,
  },
  {
    to: '/history',
    label: HEADER_LINK_TEXT.HISTORY,
    icon: History,
  },
  {
    to: '/profile',
    label: HEADER_LINK_TEXT.PROFILE,
    icon: User,
  },
];
