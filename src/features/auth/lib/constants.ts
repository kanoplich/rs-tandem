import type { LoginFormValues } from '../model/auth-schema';
import type { ForgotFormValues } from '../model/forgot-schema';
import type { RegisterFormType } from '../model/register-schema';
import type { ResetFormType } from '../model/reset-schema';

export const loginDefaultValues: LoginFormValues = {
  email: '',
  password: '',
};

export const registerDefaultValues: RegisterFormType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const REGISTER_PATTERN = {
  NAME: /^[A-ZА-ЯЁ][a-zа-яё\-'\s]{0,29}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/,
};

export const forgotDefaultValues: ForgotFormValues = {
  email: '',
};

export const resetDefaultValues: ResetFormType = {
  password: '',
  confirmPassword: '',
};
