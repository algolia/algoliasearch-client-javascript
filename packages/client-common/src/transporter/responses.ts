import type { Headers, Response } from '../types';

const DEFAULT_RATE_LIMIT_WAIT_MS = 1000;

export function isNetworkError({ isTimedOut, status }: Omit<Response, 'content'>): boolean {
  return !isTimedOut && ~~status === 0;
}

export function isRetryable({ isTimedOut, status }: Omit<Response, 'content'>): boolean {
  return isTimedOut || isNetworkError({ isTimedOut, status }) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4);
}

export function isSuccess({ status }: Pick<Response, 'status'>): boolean {
  return ~~(status / 100) === 2;
}

export function isRateLimited({ status }: Pick<Response, 'status'>): boolean {
  return ~~status === 429;
}

const HTTP_429_MESSAGE = /^HTTP 429(?:\D|$)/;

/**
 * 429 from `sendStream`: a status-bearing error, or the `HTTP 429:` string requesters used to throw.
 */
export function isRateLimitedError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    return isRateLimited(error as Pick<Response, 'status'>);
  }

  return error instanceof Error && HTTP_429_MESSAGE.test(error.message);
}

export function headersFromError(error: unknown): Headers | undefined {
  if (typeof error === 'object' && error !== null && 'headers' in error) {
    return (error as { headers?: Headers }).headers;
  }

  return undefined;
}

/**
 * `Retry-After` as a wait in milliseconds.
 * Only a positive whole-number-of-seconds string is honored; anything else (missing, `0`, HTTP-date, junk) waits 1s.
 */
export function parseRetryAfterMs(headers: Headers | undefined): number {
  const raw = headers?.['retry-after']?.trim();
  if (raw === undefined || raw.length === 0) {
    return DEFAULT_RATE_LIMIT_WAIT_MS;
  }

  if (!/^\d+$/.test(raw)) {
    return DEFAULT_RATE_LIMIT_WAIT_MS;
  }

  const seconds = Number.parseInt(raw, 10);
  if (seconds <= 0) {
    return DEFAULT_RATE_LIMIT_WAIT_MS;
  }

  return seconds * 1000;
}
