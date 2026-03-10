import { useFormContext } from 'react-hook-form';

import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { type RegisterFormType } from '../model/register-schema';

import { Label, PasswordInput } from '@/shared/ui';

export const RegisterConfirmField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormType>();

  return (
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">{AUTH_REGISTER_TEXT.CONFIRM_LABEL}</Label>

      <PasswordInput
        id="confirmPassword"
        autoComplete="new-password"
        placeholder={AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER}
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('confirmPassword')}
      />

      {errors.confirmPassword && (
        <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
      )}
    </div>
  );
};
