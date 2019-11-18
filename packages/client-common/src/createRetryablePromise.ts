export function createRetryablePromise<TResponse>(
  callback: (retry: () => Promise<TResponse>) => Promise<TResponse>
): Promise<TResponse> {
  // eslint-disable-next-line functional/no-let
  let retriesCount = 0;

  const retry = (): Promise<TResponse> => {
    retriesCount++;

    return new Promise((resolve: (promise: Promise<TResponse>) => void) => {
      setTimeout(() => {
        resolve(callback(retry));
      }, Math.min(100 * retriesCount, 1000));
    });
  };

  return callback(retry);
}
