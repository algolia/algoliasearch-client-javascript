export type CreateRetryablePromiseOptions<TResponse> = {
  /**
   * The function to run, which returns a promise.
   */
  func: () => Promise<TResponse>;

  /**
   * The validator function. It receives the resolved return of `func`.
   */
  validate: (response: TResponse) => boolean;

  /**
   * The maximum number of retry. 50 by default.
   */
  maxRetries?: number;

  /**
   * The function to decide how long to wait between retries.
   */
  timeout?: (retryCount: number) => number;
};
