export function createValidUntilNotFoundError(): Error {
  return {
    name: 'ValidUntilNotFoundError',
    message: 'ValidUntil not found in given secured api key.',
  };
}
