export function createIndicesInSameAppError(appId: string): Error & { readonly appId: string } {
  return {
    name: 'IndicesInTheSameAppError',
    message: 'Indices are in the same application. Use SearchClient.copyIndex instead.',
    appId,
  };
}
