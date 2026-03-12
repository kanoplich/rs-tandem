import type { Provider } from '@supabase/supabase-js';

export const PROVIDERS: Record<string, Provider> = {
  GOOGLE: 'google',
  GITHUB: 'github',
};
