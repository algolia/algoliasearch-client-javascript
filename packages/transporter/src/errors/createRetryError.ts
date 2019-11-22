import { RetryError, StackFrame } from '..';

export function createRetryError(stackTrace: readonly StackFrame[]): RetryError {
  return {
    name: 'RetryError',
    message:
      'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    stackTrace,
  };
}
