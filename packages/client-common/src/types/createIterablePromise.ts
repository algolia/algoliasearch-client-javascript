export type IterableOptions<TResponse> = Partial<{
  /**
   * The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
   */
  aggregator: (response: TResponse) => unknown | PromiseLike<unknown>;

  /**
   * The `validate` condition to throw an error and its message.
   */
  error: {
    /**
     * The function to validate the error condition.
     */
    validate: (response: TResponse) => boolean | PromiseLike<boolean>;

    /**
     * The error message to throw.
     */
    message: (response: TResponse) => string | PromiseLike<string>;
  };

  /**
   * The function to decide how long to wait between iterations.
   */
  timeout: () => number | PromiseLike<number>;
}>;

export type CreateIterablePromise<TResponse> = IterableOptions<TResponse> & {
  /**
   * The function to run, which returns a promise.
   *
   * The `previousResponse` parameter (`undefined` on the first call) allows you to build your request with incremental logic, to iterate on `page` or `cursor` for example.
   */
  func: (previousResponse?: TResponse | undefined) => Promise<TResponse>;

  /**
   * The validator function. It receive the resolved return of the API call.
   */
  validate: (response: TResponse) => boolean | PromiseLike<boolean>;
};
