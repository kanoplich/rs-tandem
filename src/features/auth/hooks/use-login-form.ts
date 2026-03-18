import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginDefaultValues } from '../lib/constants';
import { AUTH_LOGIN_ERRORS } from '../locales';
import { loginSchema, type LoginFormValues } from '../model/auth-schema';

import { signIn } from '@/shared/api';

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: loginDefaultValues,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);

      await signIn(data);
    } catch (err: unknown) {
      toast.error(AUTH_LOGIN_ERRORS.AUTH_ERROR);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(AUTH_LOGIN_ERRORS.AUTH_ERROR);
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
