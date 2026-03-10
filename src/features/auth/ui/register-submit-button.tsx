import { useFormContext } from 'react-hook-form';

import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { type RegisterFormType } from '../model/register-schema';

import { Button } from '@/shared/ui';

export const RegisterSubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<RegisterFormType>();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {AUTH_REGISTER_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
