import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { loginDefaultValues } from '../lib/constants';
import { AUTH_LOGIN_TEXT } from '../locales/locales';
import { loginSchema, type LoginFormValues } from '../model/auth-schema';

import { LoginEmailField } from './login-email-field';
import { LoginPasswordField } from './login-password-field';
import { LoginSubmitButton } from './login-submit-button';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';

export const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: loginDefaultValues,
  });

  const onSubmit = async (_data: LoginFormValues) => {
    // TODO: authService.login
  };

  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>{AUTH_LOGIN_TEXT.TITLE}</CardTitle>
        <CardDescription>{AUTH_LOGIN_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormProvider {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <LoginEmailField />
            <LoginPasswordField />
            <LoginSubmitButton />
          </form>
        </FormProvider>

        <p className="text-center text-sm text-muted-foreground">
          {AUTH_LOGIN_TEXT.NO_ACCOUNT}{' '}
          <Link to={ROUTES.REGISTER} className="text-primary underline underline-offset-4">
            {AUTH_LOGIN_TEXT.REGISTER_LINK}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
