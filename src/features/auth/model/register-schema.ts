import { z } from 'zod';

export const ErrorRegisterMessages = {
  EMAIL: 'Пожалуйста, укажите действительный адрес электронной почты.',
  NAME: 'Имя должно начинаться с заглавной буквы, не содержать цифр и быть не длиннее 30 символов.',
  PASSWORD: 'Ваш пароль должен содержать не менее 8 символов.',
  PASSWORD_MATCH: 'Пароли не совпадают',
};

export const namePattern = z.string().regex(/^[A-ZА-Я][a-zа-яё\-'\s]{0,29}$/, {
  message: ErrorRegisterMessages.NAME,
});

export const passwordPattern = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  .min(8, {
    message: ErrorRegisterMessages.PASSWORD,
  });

export const registerSchema = z
  .object({
    firstName: namePattern,
    email: z.email({
      message: ErrorRegisterMessages.EMAIL,
    }),
    password: passwordPattern,
    confirmPassword: z.string().min(8, {
      message: ErrorRegisterMessages.PASSWORD,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorRegisterMessages.PASSWORD_MATCH,
    path: ['confirmPassword'],
  });

export type RegisterFormType = z.infer<typeof registerSchema>;
