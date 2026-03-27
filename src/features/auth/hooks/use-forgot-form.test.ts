import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { FORGOT_PASSWORD_ERRORS, FORGOT_PASSWORD_FORM_TEXT } from '../locales';

import { useForgotForm } from './use-forgot-form';

import { resetPassword } from '@/shared/api/auth';

vi.mock('@/shared/api/auth', () => ({
  resetPassword: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useForgotForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must be initialized with default values', () => {
    const { result } = renderHook(() => useForgotForm());

    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.form.getValues().email).toBe('');
  });

  it('should successfully call resetPassword and show success message', async () => {
    const { result } = renderHook(() => useForgotForm());
    const testEmail = 'test@example.com';

    vi.mocked(resetPassword).mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.handleSubmit({ email: testEmail });
    });

    expect(resetPassword).toHaveBeenCalledWith(testEmail);
    expect(toast.success).toHaveBeenCalledWith(FORGOT_PASSWORD_FORM_TEXT.SUBMIT_SUCCESS);
    expect(result.current.error).toBeNull();
  });

  it('must handle server errors', async () => {
    const { result } = renderHook(() => useForgotForm());
    const errorMessage = 'Email not found';

    vi.mocked(resetPassword).mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.handleSubmit({ email: 'wrong@example.com' });
    });

    expect(result.current.error).toBe(errorMessage);
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('must handle unknown errors', async () => {
    const { result } = renderHook(() => useForgotForm());

    vi.mocked(resetPassword).mockRejectedValueOnce('Unexpected Error');

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@example.com' });
    });

    expect(result.current.error).toBe(FORGOT_PASSWORD_ERRORS.AUTH_ERROR);
    expect(toast.error).toHaveBeenCalledWith(FORGOT_PASSWORD_ERRORS.AUTH_ERROR);
  });
});
