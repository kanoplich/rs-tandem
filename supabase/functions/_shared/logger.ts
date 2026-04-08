export type LogLevel = 'error' | 'warn';

export interface LogContext {
  [key: string]: unknown;
}

const formatMessage = (level: LogLevel, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${level.toUpperCase()}] ${timestamp} ${message}`;
};

export const logger = {
  error: (message: string, context?: LogContext) => {
    console.error(formatMessage('error', message), context || '');
  },
  warn: (message: string, context?: LogContext) => {
    console.warn(formatMessage('warn', message), context || '');
  },
};
