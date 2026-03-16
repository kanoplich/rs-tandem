import { z } from 'zod';

import { AUTH_LOGIN_ERRORS } from '../locales';

export const emailSchema = z.email(AUTH_LOGIN_ERRORS.INVALID_EMAIL);

export const passwordSchema = z.string().min(8, AUTH_LOGIN_ERRORS.PASSWORD_MIN);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
