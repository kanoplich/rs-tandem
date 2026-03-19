import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { resetDefaultValues } from '../lib/constants';
import { RESET_PASSWORD_ERRORS, RESET_PASSWORD_FORM_TEXT } from '../locales';
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
      toast.success(RESET_PASSWORD_FORM_TEXT.RESET_SUCCESS);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        toast.error(RESET_PASSWORD_ERRORS.AUTH_ERROR);
        setError(RESET_PASSWORD_ERRORS.AUTH_ERROR);
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
