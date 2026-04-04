export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

export const ERROR_CODES = {
  EMBEDDING_FAILED: {
    code: 'EMBEDDING_FAILED',
    message: 'Failed to generate embedding',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  VECTOR_SEARCH_FAILED: {
    code: 'VECTOR_SEARCH_FAILED',
    message: 'Vector search failed',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  CHAT_COMPLETION_FAILED: {
    code: 'CHAT_COMPLETION_FAILED',
    message: 'Chat completion failed',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  OPENAI_API_KEY_MISSING: {
    code: 'OPENAI_API_KEY_MISSING',
    message: 'OpenAI API key not configured',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  TASK_NOT_FOUND: {
    code: 'TASK_NOT_FOUND',
    message: 'Task not found',
    status: HTTP_STATUS.NOT_FOUND,
  },
  TASK_ID_MISSING: {
    code: 'TASK_ID_MISSING',
    message: 'Task ID is required',
    status: HTTP_STATUS.BAD_REQUEST,
  },
  SUBMISSION_SAVE_FAILED: {
    code: 'SUBMISSION_SAVE_FAILED',
    message: 'Failed to save submission',
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  },
  INVALID_TASK_TYPE: {
    code: 'INVALID_TASK_TYPE',
    message: 'Invalid task type',
    status: HTTP_STATUS.BAD_REQUEST,
  },
  CONCURRENT_REQUEST: {
    code: 'CONCURRENT_REQUEST',
    message: 'Request already in progress',
    status: HTTP_STATUS.CONFLICT,
  },
} as const;

export type ErrorInfo = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
