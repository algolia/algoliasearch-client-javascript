export function createMissingObjectIDError(message: string): Error {
  return {
    name: 'MissingObjectIDError',
    message,
  };
}
