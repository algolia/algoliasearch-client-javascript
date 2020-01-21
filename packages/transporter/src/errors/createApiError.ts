import { ApiError, StackFrame } from '..';

export function createApiError(
  message: string,
  status: number,
  transporterStackTrace: readonly StackFrame[]
): ApiError {
  return {
    name: 'ApiError',
    message,
    status,
    transporterStackTrace,
  };
}
