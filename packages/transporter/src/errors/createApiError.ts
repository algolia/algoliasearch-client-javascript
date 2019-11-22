import { ApiError } from '..';

export function createApiError(message: string, status: number): ApiError {
  return {
    name: 'ApiError',
    message,
    status,
  };
}
