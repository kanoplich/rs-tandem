import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { loginDefaultValues } from './lib/constants';
import { AUTH_LOGIN_ERRORS } from './locales/locales';
import { loginSchema, type LoginFormValues } from './model/auth-schema';

import { signIn } from '@/shared/api';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: loginDefaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      setError(null);

      await signIn(data);
    } catch {
      setError(AUTH_LOGIN_ERRORS.INVALID_CREDENTIALS);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    loading,
    error,
  };
};
