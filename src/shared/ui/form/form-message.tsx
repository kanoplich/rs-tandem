import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  className?: string;
};

export const FormMessage = ({ name, className }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  if (!error || typeof error.message !== 'string') {
    return null;
  }

  return <p className={className}>{error.message}</p>;
};
