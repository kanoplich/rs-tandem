import { z } from 'zod';

import { FORGOT_PASSWORD_ERRORS } from '../locales';

export const emailSchema = z.email(FORGOT_PASSWORD_ERRORS.INVALID_EMAIL);

export const forgotSchema = z.object({
  email: emailSchema,
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;
