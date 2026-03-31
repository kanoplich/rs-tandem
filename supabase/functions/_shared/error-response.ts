import { corsHeaders } from './cors.ts';

export const errorResponse = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
