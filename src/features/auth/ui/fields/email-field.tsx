import { useFormContext } from 'react-hook-form';

import { FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';

type Props = {
  label: string;
  placeholder: string;
};

export const EmailField = ({ label, placeholder }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        placeholder={placeholder}
        {...register('email')}
      />
      <FormMessage name="email" className="text-xs text-destructive" />
    </FormItem>
  );
};
