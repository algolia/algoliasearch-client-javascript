import { StackFrame } from '../types';

export function createRetryError(
  stackTrace: readonly StackFrame[]
): Error & { readonly stackTrace: readonly StackFrame[] } {
  return {
    name: 'RetryError',
    message:
      'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
    stackTrace,
  };
}
