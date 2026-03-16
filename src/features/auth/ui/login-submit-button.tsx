import { AUTH_LOGIN_TEXT } from '../locales';

import { Button } from '@/shared/ui';

interface Props {
  isSubmitting: boolean;
}

export const LoginSubmitButton = ({ isSubmitting }: Props) => {
  return (
    <Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isSubmitting}>
      {isSubmitting ? AUTH_LOGIN_TEXT.BUTTON_PENDING : AUTH_LOGIN_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
