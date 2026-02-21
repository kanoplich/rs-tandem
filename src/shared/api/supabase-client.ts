import { createClient } from '@supabase/supabase-js';

// import type { Database } from '@/shared/types/database.types';
import { config } from '@/shared/config/supabase';

// export type Public = Database['public'];

const { SUPABASE_URL, SUPABASE_ANON_KEY } = config;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
