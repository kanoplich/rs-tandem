import { corsHeaders } from './cors.ts';
import type { HttpStatus } from './errors.ts';

export const errorResponse = (error: string, status: HttpStatus) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
