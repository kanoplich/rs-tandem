import { useFormContext } from 'react-hook-form';

import { FormItem, FormLabel, FormMessage, Input, cn } from '@/shared';

type Props = {
  label: string;
  placeholder: string;
  className?: string;
};

export const EmailField = ({ label, placeholder, className }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem className="space-y-2">
      <FormLabel htmlFor="email">{label}</FormLabel>
      <Input
        id="email"
        type="text"
        autoComplete="email"
        placeholder={placeholder}
        className={cn(
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
          className
        )}
        {...register('email')}
      />
      <FormMessage name="email" className="text-xs text-destructive" />
    </FormItem>
  );
};
