import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { resetDefaultValues } from '../lib/constants';
import { AUTH_REGISTER_ERRORS } from '../locales';
import { resetSchema, type ResetFormType } from '../model/reset-schema';

import { updateUserPassword } from '@/shared/api/auth';

export const useResetForm = () => {
  const form = useForm<ResetFormType>({
    mode: 'onBlur',
    resolver: zodResolver(resetSchema),
    defaultValues: resetDefaultValues,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ResetFormType) => {
    const { password } = data;

    try {
      setError(null);
      await updateUserPassword(password);
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
