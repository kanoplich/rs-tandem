/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_HOST: string;
  readonly VITE_REGION: string;
  readonly VITE_USE_MOCK_SUPABASE: string;
  readonly VITE_USE_MOCK_AI: string;
  readonly VITE_JUDGE_LEVEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
