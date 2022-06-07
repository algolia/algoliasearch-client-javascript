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
   * The maximum number of trials. 10 by default.
   */
  maxTrial?: number;

  /**
   * The function to decide how long to wait between tries.
   */
  timeout?: (retryCount: number) => number;
};
