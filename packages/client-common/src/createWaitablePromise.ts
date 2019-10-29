import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { OnWaitClosure } from './types/OnWaitClosure';
import { WaitablePromise } from './types/WaitablePromise';

export function createWaitablePromise<TResponse>(
  promise: Readonly<Promise<TResponse>>
): Readonly<WaitablePromise<TResponse>> {
  // eslint-disable-next-line functional/no-let
  let onWait: OnWaitClosure<TResponse> = (_response, _requestOptions) => Promise.resolve();

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(promise, {
    onWait(onWaitClosure: OnWaitClosure<TResponse>): Readonly<WaitablePromise<TResponse>> {
      onWait = onWaitClosure;

      return promise as WaitablePromise<TResponse>;
    },

    wait(requestOptions?: RequestOptions): Readonly<WaitablePromise<TResponse>> {
      return createWaitablePromise<TResponse>(
        promise.then(response => onWait(response, requestOptions).then(() => response))
      );
    },
  }) as WaitablePromise<TResponse>;
}
