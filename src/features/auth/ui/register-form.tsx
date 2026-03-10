import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { registerDefaultValues } from '../lib/constants';
import { AUTH_REGISTER_TEXT } from '../locales/locales';
import { registerSchema, type RegisterFormType } from '../model/register-schema';

import { RegisterConfirmField } from './register-confirm-field';
import { RegisterEmailField } from './register-email-field';
import { RegisterNameField } from './register-name-field';
import { RegisterPasswordField } from './register-password-field';
import { RegisterSubmitButton } from './register-submit-button';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';

export const RegisterForm = () => {
  const form = useForm<RegisterFormType>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = async (_data: RegisterFormType) => {
    // TODO: authService.register
  };

  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>{AUTH_REGISTER_TEXT.TITLE}</CardTitle>
        <CardDescription>{AUTH_REGISTER_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <RegisterNameField />
            <RegisterEmailField />
            <RegisterPasswordField />
            <RegisterConfirmField />
            <RegisterSubmitButton />
          </form>
        </FormProvider>

        <p className="text-center text-sm text-muted-foreground">
          {AUTH_REGISTER_TEXT.HAS_ACCOUNT}{' '}
          <Link to={ROUTES.LOGIN} className="text-primary underline underline-offset-4">
            {AUTH_REGISTER_TEXT.LOGIN_LINK}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
