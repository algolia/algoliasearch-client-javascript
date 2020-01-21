import { ApiError, StackFrame } from '..';

export function createApiError(
  message: string,
  status: number,
  stackTrace: readonly StackFrame[]
): ApiError {
  return {
    name: 'ApiError',
    message,
    status,
    stackTrace,
  };
}
