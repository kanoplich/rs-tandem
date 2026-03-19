import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useLoginForm } from '../hooks/use-login-form';
import { AUTH_LOGIN_TEXT } from '../locales';

import { LoginEmailField } from './login-email-field';
import { LoginPasswordField } from './login-password-field';
import { LoginSubmitButton } from './login-submit-button';
import { OAuthButtons } from './oauth-buttons';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';

export const LoginForm = () => {
  const { form, handleSubmit, error, isSubmitting } = useLoginForm();
  const [oauthError, setOAuthError] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>{AUTH_LOGIN_TEXT.TITLE}</CardTitle>
        <CardDescription>{AUTH_LOGIN_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormProvider {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <LoginEmailField />
            <LoginPasswordField />
            <LoginSubmitButton isSubmitting={isSubmitting} />
            <OAuthButtons onError={setOAuthError} />

            {(error || oauthError) && (
              <p className="text-center text-sm text-destructive">{error || oauthError}</p>
            )}
          </form>
        </FormProvider>

        <p className="text-center text-sm text-muted-foreground">
          {AUTH_LOGIN_TEXT.NO_ACCOUNT}{' '}
          <Link to={ROUTES.REGISTER} className="text-primary hover:no-underline">
            {AUTH_LOGIN_TEXT.REGISTER_LINK}
          </Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link to={ROUTES.FORGOT} className="text-primary hover:no-underline">
            {AUTH_LOGIN_TEXT.FORGOT_LINK}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
