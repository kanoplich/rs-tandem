import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useRegisterForm } from '../hooks/use-register-form';
import { AUTH_REGISTER_TEXT } from '../locales';

import { AuthSubmitButton, EmailField, NameField, PasswordField } from './fields';
import { OAuthButtons } from './oauth-buttons';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';
import { Form } from '@/shared/ui';

export const RegisterForm = () => {
  const { form, handleSubmit, error, isSubmitting } = useRegisterForm();
  const [oauthError, setOAuthError] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-[448px]">
      <CardHeader>
        <CardTitle>{AUTH_REGISTER_TEXT.TITLE}</CardTitle>
        <CardDescription>{AUTH_REGISTER_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <NameField
            label={AUTH_REGISTER_TEXT.NAME_LABEL}
            placeholder={AUTH_REGISTER_TEXT.NAME_PLACEHOLDER}
          />
          <EmailField
            label={AUTH_REGISTER_TEXT.EMAIL_LABEL}
            placeholder={AUTH_REGISTER_TEXT.EMAIL_PLACEHOLDER}
          />
          <PasswordField
            name="password"
            label={AUTH_REGISTER_TEXT.PASSWORD_LABEL}
            placeholder={AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
          />
          <PasswordField
            name="confirmPassword"
            label={AUTH_REGISTER_TEXT.CONFIRM_LABEL}
            placeholder={AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
          />
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingText={AUTH_REGISTER_TEXT.BUTTON_PENDING}
            submitText={AUTH_REGISTER_TEXT.SUBMIT_BUTTON}
          />
          <OAuthButtons onError={setOAuthError} />

          {(error || oauthError) && (
            <p className="text-center text-sm text-destructive">{error || oauthError}</p>
          )}
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          {AUTH_REGISTER_TEXT.HAS_ACCOUNT}{' '}
          <Link to={ROUTES.LOGIN} className="text-primary">
            {AUTH_REGISTER_TEXT.LOGIN_LINK}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
