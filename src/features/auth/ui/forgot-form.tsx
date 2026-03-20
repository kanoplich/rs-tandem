import { Link } from 'react-router-dom';

import { useForgotForm } from '../hooks/use-forgot-form';
import { FORGOT_PASSWORD_FORM_TEXT } from '../locales';

import { AuthSubmitButton, EmailField } from './fields';

import { ROUTES, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';
import { Form } from '@/shared/ui';

export const ForgotForm = () => {
  const { form, handleSubmit, error, isSubmitting } = useForgotForm();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{FORGOT_PASSWORD_FORM_TEXT.TITLE}</CardTitle>
        <CardDescription>{FORGOT_PASSWORD_FORM_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <EmailField
            label={FORGOT_PASSWORD_FORM_TEXT.EMAIL_LABEL}
            placeholder={FORGOT_PASSWORD_FORM_TEXT.EMAIL_PLACEHOLDER}
          />
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingText={FORGOT_PASSWORD_FORM_TEXT.BUTTON_PENDING}
            submitText={FORGOT_PASSWORD_FORM_TEXT.SUBMIT_BUTTON}
          />

          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          <Link to={ROUTES.LOGIN} className="text-primary underline underline-offset-4">
            {FORGOT_PASSWORD_FORM_TEXT.LOGIN_LINK}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
