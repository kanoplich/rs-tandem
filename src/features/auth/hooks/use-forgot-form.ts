import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { forgotDefaultValues } from '../lib/constants';
import { FORGOT_PASSWORD_ERRORS } from '../locales';
import { forgotSchema, type ForgotFormValues } from '../model/forgot-schema';

// import { resetPasswordForEmail } from '@/shared/api';

export const useForgotForm = () => {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    mode: 'onBlur',
    defaultValues: forgotDefaultValues,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ForgotFormValues) => {
    try {
      setError(null);

      // await resetPasswordForEmail(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(FORGOT_PASSWORD_ERRORS.AUTH_ERROR);
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
