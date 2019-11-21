import { RequestOptions } from '@algolia/transporter';

import { OnWaitClosure, WaitablePromise } from '.';

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
        promise
          .then(response => Promise.all([onWait(response, requestOptions), response]))
          .then(promiseResults => promiseResults[1])
      );
    },
  }) as WaitablePromise<TResponse>;
}
