import { getCorsHeaders } from './cors.ts';
import type { HttpStatus } from './errors.ts';

export const errorResponse = (error: string, status: HttpStatus, origin?: string | null) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { ...getCorsHeaders(origin), 'Content-Type': 'application/json' },
  });
