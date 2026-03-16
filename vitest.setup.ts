import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock('@/shared/config/supabase', () => ({
  config: {
    USE_MOCK_SUPABASE: false,
  },
}));

vi.mock('@/shared/api/supabase-client', () => ({
  supabase: {},
}));
