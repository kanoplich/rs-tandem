import { describe, it, expect } from 'vitest';

import { AUTH_REGISTER_ERRORS } from '../locales';

import { registerSchema } from './register-schema';

describe('registerSchema', () => {
  const validData = {
    name: 'Vadym',
    email: 'test@example.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('must successfully validate correct data', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should give an error if the passwords do not match', () => {
    const invalidData = {
      ...validData,
      confirmPassword: 'differentPassword',
    };

    const result = registerSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.format();
      expect(error.confirmPassword?._errors).toContain(AUTH_REGISTER_ERRORS.PASSWORD_MATCH);
    }
  });

  it('should give an error if the email format is incorrect', () => {
    const invalidData = {
      ...validData,
      email: 'invalid-email',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().email?._errors).toContain(AUTH_REGISTER_ERRORS.EMAIL);
    }
  });

  it('must require a name (min(1) check)', () => {
    const invalidData = {
      ...validData,
      name: '',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().name?._errors).toContain(AUTH_REGISTER_ERRORS.REQUIRED);
    }
  });

  it('should give an error if the password is too weak', () => {
    const invalidData = {
      ...validData,
      password: '123',
      confirmPassword: '123',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.format();
      expect(error.password?._errors).toContain(AUTH_REGISTER_ERRORS.PASSWORD);
    }
  });

  it('should give an error if the name format is incorrect', () => {
    const invalidData = {
      ...validData,
      name: 'vadym',
    };

    const result = registerSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.format();
      expect(error.name?._errors).toContain(AUTH_REGISTER_ERRORS.NAME);
    }
  });
});
