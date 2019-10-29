export function createRetryError(): Error {
  return {
    name: 'RetryError',
    message:
      'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
  };
}
