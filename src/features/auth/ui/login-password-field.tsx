import { useFormContext } from 'react-hook-form';

import { AUTH_LOGIN_TEXT } from '../locales';
import { type LoginFormValues } from '../model/auth-schema';

import { Label } from '@/shared/ui';
import { PasswordInput } from '@/shared/ui';

export const LoginPasswordField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="password">{AUTH_LOGIN_TEXT.PASSWORD_LABEL}</Label>

      <PasswordInput
        id="password"
        autoComplete="current-password"
        placeholder={AUTH_LOGIN_TEXT.PASSWORD_PLACEHOLDER}
        className="border-2 focus-visible:ring-0 focus-visible:border-primary"
        {...register('password')}
      />

      {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
    </div>
  );
};
