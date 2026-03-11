import { createClient } from '@supabase/supabase-js';

import { config } from '@/shared/config/supabase';
import type { Database } from '@/shared/types/database.types';

export type Public = Database['public'];

const { SUPABASE_URL, SUPABASE_ANON_KEY } = config;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
