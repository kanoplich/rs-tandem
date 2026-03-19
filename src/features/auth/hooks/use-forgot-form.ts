import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { forgotDefaultValues } from '../lib/constants';
import { FORGOT_PASSWORD_ERRORS, FORGOT_PASSWORD_FORM_TEXT } from '../locales';
import { forgotSchema, type ForgotFormValues } from '../model/forgot-schema';

import { resetPassword } from '@/shared/api/auth';

export const useForgotForm = () => {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    mode: 'onBlur',
    defaultValues: forgotDefaultValues,
  });

  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (data: ForgotFormValues) => {
    try {
      setError(null);

      await resetPassword(data.email);
      toast.success(FORGOT_PASSWORD_FORM_TEXT.SUBMIT_SUCCESS);
      setIsSuccess(true);
      form.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        toast.error(FORGOT_PASSWORD_ERRORS.AUTH_ERROR);
        setError(FORGOT_PASSWORD_ERRORS.AUTH_ERROR);
      }
    }
  };

  return {
    form,
    handleSubmit,
    error,
    isSuccess,
    isSubmitting: form.formState.isSubmitting,
  };
};
