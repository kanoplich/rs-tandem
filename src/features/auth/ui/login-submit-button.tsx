import { AUTH_LOGIN_TEXT } from '../locales/locales';

import { Button } from '@/shared/ui';

interface Props {
  isSubmitting: boolean;
}

export const LoginSubmitButton = ({ isSubmitting }: Props) => {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {isSubmitting ? AUTH_LOGIN_TEXT.BUTTON_PENDING : AUTH_LOGIN_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
