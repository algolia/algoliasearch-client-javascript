import type { CreateRetryablePromiseOptions } from './types/CreateRetryablePromise';

/**
 * Return a promise that retry a task until it meets the condition.
 *
 * @param createRetryablePromiseOptions - The createRetryablePromise options.
 * @param createRetryablePromiseOptions.func - The function to run, which returns a promise.
 * @param createRetryablePromiseOptions.validate - The validator function. It receives the resolved return of `func`.
 * @param createRetryablePromiseOptions.maxTrial - The maximum number of trials. 10 by default.
 * @param createRetryablePromiseOptions.timeout - The function to decide how long to wait between tries.
 */
export function createRetryablePromise<TResponse>({
  func,
  validate,
  maxTrial = 10,
  timeout = (retryCount: number): number => Math.min(retryCount * 10, 1000),
}: CreateRetryablePromiseOptions<TResponse>): Promise<TResponse> {
  let retryCount = 0;
  const retry = (): Promise<TResponse> => {
    return new Promise<TResponse>((resolve, reject) => {
      func()
        .then((response) => {
          const isValid = validate(response);
          if (isValid) {
            resolve(response);
          } else if (retryCount + 1 >= maxTrial) {
            reject(
              new Error(
                `The maximum number of trials exceeded. (${
                  retryCount + 1
                }/${maxTrial})`
              )
            );
          } else {
            retryCount += 1;
            setTimeout(() => {
              retry().then(resolve).catch(reject);
            }, timeout(retryCount));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return retry();
}
