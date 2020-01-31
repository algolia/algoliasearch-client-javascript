export function createDestinationIndiceExistsError(): Error {
  return {
    name: 'DestinationIndiceAlreadyExistsError',
    message: 'Destination indice already exists.',
  };
}
