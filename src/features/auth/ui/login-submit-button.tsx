import { useFormContext } from 'react-hook-form';

import { AUTH_LOGIN_TEXT } from '../locales/locales';
import { type LoginFormValues } from '../model/auth-schema';

import { Button } from '@/shared/ui';

export const LoginSubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<LoginFormValues>();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {isSubmitting ? AUTH_LOGIN_TEXT.BUTTON_PENDING : AUTH_LOGIN_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
