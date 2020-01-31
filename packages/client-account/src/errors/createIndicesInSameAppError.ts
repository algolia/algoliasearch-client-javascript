import { IndicesInSameAppError } from '..';

export function createIndicesInSameAppError(appId: string): IndicesInSameAppError {
  return {
    name: 'IndicesInTheSameAppError',
    message: 'Indices are in the same application. Use SearchClient.copyIndex instead.',
    appId,
  };
}
