import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { authApi } from './auth-api';
import { loginDefaultValues } from './lib/constants';
import { loginSchema, type LoginFormValues } from './model/auth-schema';

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

      await authApi.login(data.email, data.password);
    } catch {
      setError(
        'Невозможно войти в систему. Пожалуйста, проверьте свои учетные данные и попробуйте снова.'
      );
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
