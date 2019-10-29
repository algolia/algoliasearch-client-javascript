import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { OnWaitClosure } from './OnWaitClosure';

export type WaitablePromise<TResponse> = Readonly<Promise<TResponse>> & {
  readonly onWait: (
    onWaitClosure: OnWaitClosure<TResponse>
  ) => Readonly<WaitablePromise<TResponse>>;
  readonly wait: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<TResponse>>;
};
