import { useFormContext } from 'react-hook-form';

import type { LoginFormValues } from '../model/auth.schema';
import { AUTH_LOGIN_TEXT } from '../model/login.constants';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export const LoginEmailField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="email">{AUTH_LOGIN_TEXT.EMAIL_LABEL}</Label>

      <Input
        id="email"
        type="email"
        autoComplete="email"
        placeholder={AUTH_LOGIN_TEXT.EMAIL_PLACEHOLDER}
        className="focus-visible:ring-primary focus-visible:border-primary"
        {...register('email')}
      />

      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
    </div>
  );
};
