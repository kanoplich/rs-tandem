export const API_ENDPOINTS = {
  GROQ: {
    CHAT_COMPLETIONS: 'https://api.groq.com/openai/v1/chat/completions',
  },
  OPENAI: {
    EMBEDDINGS: 'https://api.openai.com/v1/embeddings',
  },
} as const;
