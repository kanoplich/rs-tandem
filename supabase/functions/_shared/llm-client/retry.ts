import { HTTP_STATUS } from '../errors.ts';
import { logger } from '../logger.ts';

const RETRYABLE_STATUSES = new Set([
  HTTP_STATUS.TOO_MANY_REQUESTS,
  HTTP_STATUS.BAD_GATEWAY,
  HTTP_STATUS.SERVICE_UNAVAILABLE,
]);
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 15_000;

interface RetryOptions {
  maxRetries: number;
  timeoutMs: number;
}

export async function fetchWithRetry(
  requestFn: (signal: AbortSignal) => Promise<Response>,
  opts: RetryOptions
): Promise<Response> {
  const { maxRetries, timeoutMs } = opts;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await requestFn(controller.signal);
      clearTimeout(timer);

      if (response.ok || !RETRYABLE_STATUSES.has(response.status)) {
        return response;
      }

      if (attempt === maxRetries) {
        return response;
      }

      const retryAfterHeader = response.headers.get('retry-after');
      const retryAfterSeconds = retryAfterHeader ? parseFloat(retryAfterHeader) : NaN;
      const delay = !isNaN(retryAfterSeconds)
        ? Math.min(retryAfterSeconds * 1000, MAX_DELAY_MS)
        : Math.min(BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500, MAX_DELAY_MS);

      logger.warn(
        `LLM request failed (${response.status}), retry ${attempt + 1}/${maxRetries} in ${Math.round(delay)}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      clearTimeout(timer);

      if (error instanceof DOMException && error.name === 'AbortError') {
        if (attempt === maxRetries) {
          throw new Error(
            `LLM request timed out after ${maxRetries + 1} attempts (${timeoutMs}ms each)`
          );
        }
        logger.warn(`LLM request timed out, retry ${attempt + 1}/${maxRetries}`);
        await new Promise((resolve) => setTimeout(resolve, BASE_DELAY_MS));
        continue;
      }

      throw error;
    }
  }

  throw new Error('fetchWithRetry: exhausted all retries');
}
