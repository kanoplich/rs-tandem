import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLoginForm } from '../hooks/use-login-form';
import { AUTH_LOGIN_TEXT } from '../locales';

import { AuthSubmitButton, EmailField, PasswordField } from './fields';
import { OAuthButtons } from './oauth-buttons';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';
import { Form } from '@/shared/ui';

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
        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <EmailField
            label={AUTH_LOGIN_TEXT.EMAIL_LABEL}
            placeholder={AUTH_LOGIN_TEXT.EMAIL_PLACEHOLDER}
          />
          <PasswordField
            name="password"
            label={AUTH_LOGIN_TEXT.PASSWORD_LABEL}
            placeholder={AUTH_LOGIN_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="current-password"
          />
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingText={AUTH_LOGIN_TEXT.BUTTON_PENDING}
            submitText={AUTH_LOGIN_TEXT.SUBMIT_BUTTON}
          />
          <OAuthButtons onError={setOAuthError} />

          {(error || oauthError) && (
            <p className="text-center text-sm text-destructive">{error || oauthError}</p>
          )}
        </Form>

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
