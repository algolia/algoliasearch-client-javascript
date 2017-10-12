// @flow

import type { IndexName, TaskID } from 'algoliasearch';
import type {
  RequestMethod,
  RequestOptions,
  Result,
} from 'algoliasearch-requester';

type LoopInfo = { loop?: number, baseDelay?: number, maxDelay?: number };

export default function waitTask(
  {
    taskID,
    loopInfo = {},
  }: {
    taskID: TaskID,
    loopInfo?: LoopInfo,
  },
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  }
): Promise<Result> {
  const { loop = 0, baseDelay = 250, maxDelay = 10000 } = loopInfo;

  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/task/${taskID}`,
    requestType: 'write',
    requestOptions,
  }).then((res: Result) => {
    if (res.status === 'published') {
      return res;
    }

    const currentLoop = loop + 1;

    const delay = new Promise(resolve =>
      setTimeout(
        resolve,
        Math.min(baseDelay * currentLoop * currentLoop, maxDelay)
      )
    );

    return delay.then(() =>
      waitTask(
        {
          taskID,
          loopInfo: { loop: currentLoop },
        },
        {
          requester,
          indexName,
          requestOptions,
        }
      )
    );
  });
}
