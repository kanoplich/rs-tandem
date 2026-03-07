import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { registerDefaultValues } from '../lib/constants';
import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { registerSchema, type RegisterFormType } from '../model/register-schema';

import { ROUTES } from '@/shared';
import { Button, Input, Label, PasswordInput } from '@/shared/ui';

export const RegisterForm = () => {
  const form = useForm<RegisterFormType>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const handleSubmit = async (data: RegisterFormType) => {
    console.log(data);
    //  await signUp(viewer);
  };

  return (
    <div className="w-full max-w-[448px]">
      <h2>{AUTH_REGISTER_TEXT.TITLE}</h2>
      <p>{AUTH_REGISTER_TEXT.DESCRIPTION}</p>

      <div className="space-y-6"></div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{AUTH_REGISTER_TEXT.NAME_LABEL}</Label>
          <Input
            id="firstName"
            placeholder={AUTH_REGISTER_TEXT.NAME_PLACEHOLDER}
            {...form.register('firstName')}
          />
          <p className="text-red-500">{form.formState.errors.firstName?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{AUTH_REGISTER_TEXT.EMAIL_LABEL}</Label>
          <Input
            id="email"
            className="focus-visible:ring-primary/50 focus-visible:border-primary"
            type="email"
            autoComplete="email"
            placeholder={AUTH_REGISTER_TEXT.EMAIL_PLACEHOLDER}
            {...form.register('email')}
          />
          <p>{form.formState.errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{AUTH_REGISTER_TEXT.PASSWORD_LABEL}</Label>
          <PasswordInput
            id="password"
            className="focus-visible:ring-primary/50 focus-visible:border-primary"
            placeholder={AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="current-password"
            {...form.register('password')}
          />
          <p>{form.formState.errors.password?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{AUTH_REGISTER_TEXT.PASSWORD_LABEL}</Label>
          <PasswordInput
            id="confirmPassword"
            className="focus-visible:ring-primary/50 focus-visible:border-primary"
            placeholder={AUTH_REGISTER_TEXT.CONFIRM_LABEL}
            autoComplete="current-password"
            {...form.register('confirmPassword')}
          />
          <p>{form.formState.errors.confirmPassword?.message}</p>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          {AUTH_REGISTER_TEXT.SUBMIT_BUTTON}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {AUTH_REGISTER_TEXT.HAS_ACCOUNT}{' '}
        <Link to={ROUTES.LOGIN} className="text-primary underline underline-offset-4">
          {AUTH_REGISTER_TEXT.LOGIN_LINK}
        </Link>
      </p>
    </div>
  );
};
