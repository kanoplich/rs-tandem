import { useFormContext } from 'react-hook-form';

import type { LoginFormValues } from '../model/auth.schema';
import { AUTH_LOGIN_TEXT } from '../model/login.constants';

import { Button } from '@/shared/ui/button';

export const LoginSubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<LoginFormValues>();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {AUTH_LOGIN_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
