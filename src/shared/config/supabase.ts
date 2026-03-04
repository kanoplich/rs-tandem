export const config = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  HOST: import.meta.env.VITE_HOST,
  JUDGE_LEVEL: parseInt(import.meta.env.VITE_JUDGE_LEVEL || '0'),
  USE_MOCK_SUPABASE: import.meta.env.VITE_USE_MOCK_SUPABASE === 'true',
  USE_MOCK_AI: import.meta.env.VITE_USE_MOCK_AI === 'true',
} as const;
