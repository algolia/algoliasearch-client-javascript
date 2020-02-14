import { WaitablePromise } from '..';

export function waitResponses(responses: Array<Readonly<WaitablePromise<any>>>) {
  return Promise.all(responses.map(response => response.wait()));
}
