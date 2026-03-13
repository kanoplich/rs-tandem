import { corsHeaders } from './cors.ts';

export const errorResponse = (error: string, status: number) => {
  return new Response(JSON.stringify({ error: `${error}` }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
};
