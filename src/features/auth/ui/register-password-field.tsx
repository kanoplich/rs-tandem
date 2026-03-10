import { useFormContext } from 'react-hook-form';

import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { type RegisterFormType } from '../model/register-schema';

import { Label, PasswordInput } from '@/shared/ui';

export const RegisterPasswordField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormType>();

  return (
    <div className="space-y-2">
      <Label htmlFor="password">{AUTH_REGISTER_TEXT.PASSWORD_LABEL}</Label>
      <PasswordInput
        id="password"
        autoComplete="new-password"
        placeholder={AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER}
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('password')}
      />

      {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
    </div>
  );
};
