import { describe, it, expect } from 'vitest';

import { AUTH_LOGIN_ERRORS } from '../locales';

import { forgotSchema } from './forgot-schema';

describe('forgotSchema', () => {
  const validData = {
    email: 'test@example.com',
  };

  it('must successfully validate correct data', () => {
    const result = forgotSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should give an error if the email format is incorrect', () => {
    const invalidData = {
      email: 'invalid-email',
    };

    const result = forgotSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.format().email?._errors).toContain(AUTH_LOGIN_ERRORS.INVALID_EMAIL);
    }
  });
});
