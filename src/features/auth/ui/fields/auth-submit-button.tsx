import { Button } from '@/shared/ui';

type Props = {
  isSubmitting: boolean;
  pendingText: string;
  submitText: string;
};

export const AuthSubmitButton = ({ isSubmitting, pendingText, submitText }: Props) => {
  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
      {isSubmitting ? pendingText : submitText}
    </Button>
  );
};
