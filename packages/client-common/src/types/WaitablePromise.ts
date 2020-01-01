import { RequestOptions } from '@algolia/transporter';

export type WaitablePromise<TResponse> = Readonly<Promise<TResponse>> & {
  /**
   * If called, the promise will be only resolved after the waitable callback.
   */
  readonly wait: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<TResponse>>;
};
