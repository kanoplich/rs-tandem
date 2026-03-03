import { useFormContext } from 'react-hook-form';

import { AUTH_LOGIN_TEXT, type LoginFormValues } from '../';

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
