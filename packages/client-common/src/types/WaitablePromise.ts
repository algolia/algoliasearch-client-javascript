import { RequestOptions } from '@algolia/transporter';

export type WaitablePromise<TResponse> = Readonly<Promise<TResponse>> & {
  readonly wait: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<TResponse>>;
};
