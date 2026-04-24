export type LogLevel = 'error' | 'warn' | 'info';

export interface LogContext {
  [key: string]: unknown;
}

const formatMessage = (level: LogLevel, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${level.toUpperCase()}] ${timestamp} ${message}`;
};

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.info(formatMessage('info', message), context || '');
  },
  error: (message: string, context?: LogContext) => {
    console.error(formatMessage('error', message), context || '');
  },
  warn: (message: string, context?: LogContext) => {
    console.warn(formatMessage('warn', message), context || '');
  },
};
