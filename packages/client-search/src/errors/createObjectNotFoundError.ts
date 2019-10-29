export function createObjectNotFoundError(): Error {
  return {
    name: 'ObjectNotFoundError',
    message: 'Object not found.',
  };
}
