import { describe, it, expect } from 'vitest';

import { RESET_PASSWORD_ERRORS } from '../locales';

import { resetSchema } from './reset-schema';

describe('resetSchema', () => {
  const validData = {
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('must successfully validate correct data', () => {
    const result = resetSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should give an error if the passwords do not match', () => {
    const invalidData = {
      ...validData,
      confirmPassword: 'differentPassword',
    };

    const result = resetSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const error = result.error.format();
      expect(error.confirmPassword?._errors).toContain(RESET_PASSWORD_ERRORS.PASSWORD_MATCH);
    }
  });

  it('should give an error if the password does not meet requirements', () => {
    const invalidData = {
      password: '123',
      confirmPassword: '123',
    };

    const result = resetSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
