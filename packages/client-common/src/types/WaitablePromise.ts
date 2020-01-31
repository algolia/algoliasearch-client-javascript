import { RequestOptions } from '@algolia/transporter';

export type WaitablePromise<TResponse> = Readonly<Promise<TResponse>> & {
  /**
   * Wait for a task to complete before executing the next line of code, to synchronize index updates.
   *
   * All write operations in Algolia are asynchronous by design. It means that when you add or
   * update an object to your index, our servers will reply to your request with a taskID as
   * soon as they understood the write operation. The actual insert and indexing will be
   * done after replying to your code.
   *
   * You can wait for a task to complete by using this method.
   */
  readonly wait: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<TResponse>>;
};
