export function createRetryablePromise<TResponse>(
  callback: (retry: () => Promise<TResponse>) => Promise<TResponse>
): Promise<TResponse> {
  let retriesCount = 0; // eslint-disable-line functional/no-let

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
