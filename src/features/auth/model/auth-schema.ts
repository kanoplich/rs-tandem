import { z } from 'zod';

import { AUTH_LOGIN_ERRORS } from '../locales/locales';

export const emailSchema = z.email(AUTH_LOGIN_ERRORS.INVALID_EMAIL);

export const passwordSchema = z
  .string()
  .min(8, AUTH_LOGIN_ERRORS.PASSWORD_MIN)
  .regex(/^[A-Za-z0-9]+$/, AUTH_LOGIN_ERRORS.PASSWORD_INVALID);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
