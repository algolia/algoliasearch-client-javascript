import { RequestOptions } from '@algolia/transporter';

import { Wait, WaitablePromise } from '.';

export function createWaitablePromise<TResponse>(
  promise: Readonly<Promise<TResponse>>,
  wait: Wait<TResponse> = (_response, _requestOptions) => {
    return Promise.resolve();
  }
): Readonly<WaitablePromise<TResponse>> {
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(promise, {
    wait(requestOptions?: RequestOptions): Readonly<WaitablePromise<TResponse>> {
      return createWaitablePromise<TResponse>(
        promise
          .then(response => Promise.all([wait(response, requestOptions), response]))
          .then(promiseResults => promiseResults[1])
      );
    },
  }) as WaitablePromise<TResponse>;
}
