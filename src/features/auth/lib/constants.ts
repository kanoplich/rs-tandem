import type { LoginFormValues } from '../model/auth-schema';
import type { RegisterFormType } from '../model/register-schema';

export const loginDefaultValues: LoginFormValues = {
  email: '',
  password: '',
};

export const registerDefaultValues: RegisterFormType = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const REGISTER_PATTERN = {
  NAME: /^[A-ZА-Я][a-zа-яё\-'\s]{0,29}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};
