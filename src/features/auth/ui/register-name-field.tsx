import { useFormContext } from 'react-hook-form';

import { AUTH_REGISTER_TEXT } from '../locales';
import { type RegisterFormType } from '../model/register-schema';

import { Input, Label } from '@/shared/ui';

export const RegisterNameField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormType>();

  return (
    <div className="space-y-2">
      <Label htmlFor="userName">{AUTH_REGISTER_TEXT.NAME_LABEL}</Label>

      <Input
        id="userName"
        placeholder={AUTH_REGISTER_TEXT.NAME_PLACEHOLDER}
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('name')}
      />

      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
    </div>
  );
};
