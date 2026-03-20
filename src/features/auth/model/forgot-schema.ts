import { z } from 'zod';

import { emailSchema } from './common-schemas';

export const forgotSchema = z.object({
  email: emailSchema,
});

export type ForgotFormValues = z.infer<typeof forgotSchema>;
