import { AUTH_REGISTER_TEXT } from '../locales';

import { Button } from '@/shared/ui';

interface Props {
  isSubmitting: boolean;
}

export const RegisterSubmitButton = ({ isSubmitting }: Props) => {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {isSubmitting ? AUTH_REGISTER_TEXT.BUTTON_PENDING : AUTH_REGISTER_TEXT.SUBMIT_BUTTON}
    </Button>
  );
};
