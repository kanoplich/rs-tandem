import type { ReactElement } from 'react';
import {
  Controller,
  type FieldValues,
  type FieldPath,
  type Control,
  type ControllerRenderProps,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  render: (field: ControllerRenderProps<T, FieldPath<T>>) => ReactElement;
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  render,
}: Props<T>): ReactElement => {
  return <Controller control={control} name={name} render={({ field }) => render(field)} />;
};
