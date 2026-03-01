export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  APP: '/app',
  DASHBOARD: '/app/dashboard',
  TOPICS: '/app/topics',
  TASK: '/app/task/:id',
  HISTORY: '/app/history',
  PROFILE: '/app/profile',
  NOT_FOUND: '*',
} as const;
