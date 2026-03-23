import { useResetForm } from '../hooks/use-reset-form';
import { RESET_PASSWORD_FORM_TEXT } from '../locales';

import { AuthSubmitButton, PasswordField } from './fields';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared';
import { Form } from '@/shared/ui';

export const ResetForm = () => {
  const { form, handleSubmit, error, isSubmitting } = useResetForm();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{RESET_PASSWORD_FORM_TEXT.TITLE}</CardTitle>
        <CardDescription>{RESET_PASSWORD_FORM_TEXT.DESCRIPTION}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <PasswordField
            name="password"
            label={RESET_PASSWORD_FORM_TEXT.PASSWORD_LABEL}
            placeholder={RESET_PASSWORD_FORM_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
          />
          <PasswordField
            name="confirmPassword"
            label={RESET_PASSWORD_FORM_TEXT.CONFIRM_LABEL}
            placeholder={RESET_PASSWORD_FORM_TEXT.PASSWORD_PLACEHOLDER}
            autoComplete="new-password"
          />
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            pendingText={RESET_PASSWORD_FORM_TEXT.BUTTON_PENDING}
            submitText={RESET_PASSWORD_FORM_TEXT.SUBMIT_BUTTON}
          />

          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </Form>
      </CardContent>
    </Card>
  );
};
