import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { RESET_PASSWORD_ERRORS, RESET_PASSWORD_FORM_TEXT } from '../locales';

import { useResetForm } from './use-reset-form';

import { ROUTES } from '@/shared';
import { updateUserPassword } from '@/shared/api/auth';
import type { AuthUser } from '@/shared/api/auth/types';

vi.mock('@/shared/api/auth', () => ({
  updateUserPassword: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useResetForm', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('must be initialized with default values', () => {
    const { result } = renderHook(() => useResetForm());

    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.form.getValues().password).toBe('');
  });

  it('should successfully update password and navigate to dashboard', async () => {
    const { result } = renderHook(() => useResetForm());
    const testData = {
      password: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
    };

    const mockUser = { id: 'user-123' } as AuthUser;
    vi.mocked(updateUserPassword).mockResolvedValueOnce(mockUser);

    await act(async () => {
      await result.current.handleSubmit(testData);
    });

    expect(updateUserPassword).toHaveBeenCalledWith(testData.password);
    expect(toast.success).toHaveBeenCalledWith(RESET_PASSWORD_FORM_TEXT.RESET_SUCCESS);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
  });

  it('must handle errors during password update', async () => {
    const { result } = renderHook(() => useResetForm());
    const errorMessage = 'Weak password';

    vi.mocked(updateUserPassword).mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.handleSubmit({
        password: '123',
        confirmPassword: '123',
      });
    });

    expect(result.current.error).toBe(errorMessage);
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('must handle unknown errors', async () => {
    const { result } = renderHook(() => useResetForm());

    vi.mocked(updateUserPassword).mockRejectedValueOnce({});

    await act(async () => {
      await result.current.handleSubmit({
        password: 'NewPassword123!',
        confirmPassword: 'NewPassword123!',
      });
    });

    expect(result.current.error).toBe(RESET_PASSWORD_ERRORS.AUTH_ERROR);
    expect(toast.error).toHaveBeenCalledWith(RESET_PASSWORD_ERRORS.AUTH_ERROR);
  });
});
