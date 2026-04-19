const ALLOWED_ORIGINS = ['https://rs-tandem.netlify.app', 'http://localhost:5173'];

const isAllowedOrigin = (origin: string): boolean => {
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  if (origin.endsWith('--rs-tandem.netlify.app') && origin.startsWith('https://deploy-preview-')) {
    return true;
  }

  return false;
};

export const getCorsHeaders = (origin?: string | null) => {
  const allowedOrigin = origin && isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
};
