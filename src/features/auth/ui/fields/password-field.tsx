import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared';
import { FormItem, FormLabel, FormMessage, PasswordInput } from '@/shared/ui';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
};

export const PasswordField = ({ name, label, placeholder, autoComplete, className }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem className="space-y-2">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <PasswordInput
        id={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
          className
        )}
        {...register(name)}
      />
      <FormMessage name={name} className="text-xs text-destructive" />
    </FormItem>
  );
};
