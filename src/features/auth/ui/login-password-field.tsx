import { useFormContext } from 'react-hook-form';

import { type LoginFormValues } from '../';
import { AUTH_LOGIN_TEXT } from '../locales/locales';

import { Label } from '@/shared/ui';
import { PasswordInput } from '@/shared/ui/password-input';

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
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('password')}
      />

      {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
    </div>
  );
};
