import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { AUTH_REGISTER_ERRORS, AUTH_REGISTER_TEXT } from '../locales';

import { useRegisterForm } from './use-register-form';

import { type AuthSession, signUp } from '@/shared/api';

vi.mock('@/shared/api', () => ({
  signUp: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useRegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must be initialized with default values', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.form.getValues().email).toBe('');
  });

  it('should successfully call signUp and show a notification', async () => {
    const { result } = renderHook(() => useRegisterForm());
    const testData = {
      name: 'Vadym',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    };

    const mockSession = {
      user: { id: 'user-123', email: testData.email },
    } as Partial<AuthSession>;

    vi.mocked(signUp).mockResolvedValueOnce(mockSession as AuthSession);

    await act(async () => {
      await result.current.handleSubmit(testData);
    });

    expect(signUp).toHaveBeenCalledWith({
      name: testData.name,
      email: testData.email,
      password: testData.password,
    });

    expect(toast.success).toHaveBeenCalledWith(AUTH_REGISTER_TEXT.REGISTER_SUCCESS);
    expect(result.current.error).toBeNull();
  });

  it('must handle errors during registration', async () => {
    const { result } = renderHook(() => useRegisterForm());
    const errorMessage = 'User already exists';

    vi.mocked(signUp).mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.handleSubmit({
        name: 'Vadym',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });
    });

    expect(result.current.error).toBe(errorMessage);
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('must handle unknown errors (not Instanceof Error)', async () => {
    const { result } = renderHook(() => useRegisterForm());

    vi.mocked(signUp).mockRejectedValueOnce('Unexpected String Error');

    await act(async () => {
      await result.current.handleSubmit({
        name: 'Vadym',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });
    });

    expect(result.current.error).toBe(AUTH_REGISTER_ERRORS.AUTH_ERROR);
    expect(toast.error).toHaveBeenCalledWith(AUTH_REGISTER_ERRORS.AUTH_ERROR);
  });
});
