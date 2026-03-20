import { z } from 'zod';

import { RESET_PASSWORD_ERRORS } from '../locales';

import { passwordValidation } from './common-schemas';

export const resetSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: RESET_PASSWORD_ERRORS.PASSWORD_MATCH,
    path: ['confirmPassword'],
  });

export type ResetFormType = z.infer<typeof resetSchema>;
