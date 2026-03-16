import { z } from 'zod';

import { REGISTER_PATTERN } from '../lib/constants';
import { AUTH_REGISTER_ERRORS } from '../locales';

export const nameValidation = z
  .string()
  .min(1, { message: AUTH_REGISTER_ERRORS.REQUIRED })
  .regex(REGISTER_PATTERN.NAME, {
    message: AUTH_REGISTER_ERRORS.NAME,
  });

export const passwordValidation = z
  .string()
  .min(1, { message: AUTH_REGISTER_ERRORS.REQUIRED })
  .regex(REGISTER_PATTERN.PASSWORD, {
    message: AUTH_REGISTER_ERRORS.PASSWORD,
  });

export const registerSchema = z
  .object({
    name: nameValidation,
    email: z.email({
      message: AUTH_REGISTER_ERRORS.EMAIL,
    }),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_REGISTER_ERRORS.PASSWORD_MATCH,
    path: ['confirmPassword'],
  });

export type RegisterFormType = z.infer<typeof registerSchema>;
