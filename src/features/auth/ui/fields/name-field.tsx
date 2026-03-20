import { useFormContext } from 'react-hook-form';

import { FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';

type Props = {
  label: string;
  placeholder: string;
};

export const NameField = ({ label, placeholder }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Input id="name" placeholder={placeholder} {...register('name')} />
      <FormMessage name="name" className="text-xs text-destructive" />
    </FormItem>
  );
};
