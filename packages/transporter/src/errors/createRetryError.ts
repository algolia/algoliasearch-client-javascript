import { RetryError, StackFrame } from '..';

export function createRetryError(transporterStackTrace: readonly StackFrame[]): RetryError {
  return {
    name: 'RetryError',
    message:
      'Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the [Algolia Support team](https://support.algolia.com/hc/en-us/requests/new).',
    transporterStackTrace,
  };
}
