import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useRegisterForm } from '../hooks/use-register-form';
import { AUTH_REGISTER_TEXT } from '../locales';

import { RegisterConfirmField } from './register-confirm-field';
import { RegisterEmailField } from './register-email-field';
import { RegisterNameField } from './register-name-field';
import { RegisterPasswordField } from './register-password-field';
import { RegisterSubmitButton } from './register-submit-button';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';

export const RegisterForm = () => {
  const { form, handleSubmit, error, isSubmitting } = useRegisterForm();

  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>{AUTH_REGISTER_TEXT.TITLE}</CardTitle>
        <CardDescription>{AUTH_REGISTER_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" noValidate>
            <RegisterNameField />
            <RegisterEmailField />
            <RegisterPasswordField />
            <RegisterConfirmField />
            <RegisterSubmitButton isSubmitting={isSubmitting} />

            {error && <p className="text-center text-sm text-destructive">{error}</p>}
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
