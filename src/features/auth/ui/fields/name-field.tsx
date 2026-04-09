import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';

type Props = {
  label: string;
  placeholder: string;
  className?: string;
};

export const NameField = ({ label, placeholder, className }: Props) => {
  const { register } = useFormContext();

  return (
    <FormItem className="space-y-2">
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Input
        id="name"
        placeholder={placeholder}
        {...register('name')}
        className={cn(
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
          className
        )}
      />
      <FormMessage name="name" className="text-xs text-destructive" />
    </FormItem>
  );
};
