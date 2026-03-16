import { z } from 'zod';

import { REGISTER_PATTERN } from '../lib/constants';
import { RESET_PASSWORD_ERRORS } from '../locales';

export const resetValidation = z
  .string()
  .min(1, { message: RESET_PASSWORD_ERRORS.REQUIRED })
  .regex(REGISTER_PATTERN.PASSWORD, {
    message: RESET_PASSWORD_ERRORS.PASSWORD,
  });

export const resetSchema = z
  .object({
    password: resetValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: RESET_PASSWORD_ERRORS.PASSWORD_MATCH,
    path: ['confirmPassword'],
  });

export type ResetFormType = z.infer<typeof resetSchema>;
