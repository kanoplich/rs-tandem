import { useFormContext } from 'react-hook-form';

import { FormItem, FormLabel, FormMessage, PasswordInput } from '@/shared/ui';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
};

export const PasswordField = ({ name, label, placeholder, autoComplete }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <PasswordInput
        id={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register(name)}
      />
      <FormMessage name={name} />
    </FormItem>
  );
};
