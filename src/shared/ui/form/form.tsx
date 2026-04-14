import type { ReactElement, ReactNode } from 'react';
import { FormProvider, type UseFormReturn, type FieldValues } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  children: ReactNode;
  className?: string;
};

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>): ReactElement => {
  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
