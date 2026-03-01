import { z } from 'zod';

export const emailSchema = z.email('Введите корректный email');

export const passwordSchema = z.string().min(8, 'Минимум 8 символов');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
