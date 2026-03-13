import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { registerDefaultValues } from '../lib/constants';
import { AUTH_REGISTER_ERRORS } from '../locales';
import { registerSchema, type RegisterFormType } from '../model/register-schema';

import { signUp } from '@/shared/api';
import type { RegisterCredentials } from '@/shared/api/auth/types';

export const useRegisterForm = () => {
  const form = useForm<RegisterFormType>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: RegisterFormType) => {
    const { name, email, password } = data;
    const userData: RegisterCredentials = {
      name,
      email,
      password,
    };

    try {
      setError(null);
      await signUp(userData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(AUTH_REGISTER_ERRORS.AUTH_ERROR);
      }
    }
  };

  return {
    form,
    handleSubmit,
    error,
    isSubmitting: form.formState.isSubmitting,
  };
};
