import { z } from 'zod';

import { REGISTER_PATTERN } from '../lib/constants';
import { AUTH_LOGIN_ERRORS, AUTH_REGISTER_ERRORS } from '../locales';

export const emailSchema = z.email(AUTH_LOGIN_ERRORS.INVALID_EMAIL);

export const passwordValidation = z
  .string()
  .min(1, { message: AUTH_REGISTER_ERRORS.REQUIRED })
  .regex(REGISTER_PATTERN.PASSWORD, {
    message: AUTH_REGISTER_ERRORS.PASSWORD,
  });
