import { useFormContext } from 'react-hook-form';

import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { type RegisterFormType } from '../model/register-schema';

import { Input, Label } from '@/shared/ui';

export const RegisterEmailField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormType>();

  return (
    <div className="space-y-2">
      <Label htmlFor="email">{AUTH_REGISTER_TEXT.EMAIL_LABEL}</Label>

      <Input
        id="email"
        type="email"
        autoComplete="email"
        placeholder={AUTH_REGISTER_TEXT.EMAIL_PLACEHOLDER}
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('email')}
      />

      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
    </div>
  );
};
