export const config = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  HOST: import.meta.env.VITE_HOST,
  VITE_JUDGE_LEVEL: import.meta.env.VITE_JUDGE_LEVEL,
  USE_MOCK_SUPABASE: import.meta.env.VITE_USE_MOCK_SUPABASE === 'true',
} as const;
