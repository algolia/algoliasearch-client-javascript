import { RetryError, StackFrame } from '..';

export function createRetryError(transporterStackTrace: readonly StackFrame[]): RetryError {
  return {
    name: 'RetryError',
    message:
      'Unreachable hosts - your application id may be incorrect. If the error persists, please create a ticket at https://support.algolia.com/ sharing steps we can use to reproduce the issue.',
    transporterStackTrace,
  };
}
