export function createMissingObjectIDError(): Error {
  return {
    name: 'MissingObjectIDError',
    message:
      'All objects must have an unique objectID ' +
      '(like a primary key) to be valid. ' +
      'Algolia is also able to generate objectIDs ' +
      "automatically but *it's not recommended*. " +
      "To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option.",
  };
}
