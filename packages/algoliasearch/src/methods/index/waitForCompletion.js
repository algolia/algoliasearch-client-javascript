// @flow

import type {
  RequestMethod,
  IndexName,
  Result,
  TaskID,
  RequestOptions,
} from '../../types';

type LoopInfo = { loop?: number, baseDelay?: number, maxDelay?: number };

export default function waitForCompletion({
  requester,
  indexName,
  taskID,
  loopInfo = {},
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  taskID: TaskID,
  loopInfo?: LoopInfo,
  options?: RequestOptions,
}): Promise<Result> {
  const { loop = 0, baseDelay = 250, maxDelay = 10000 } = loopInfo;

  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/task/${taskID}`,
    requestType: 'write',
    options,
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
      waitForCompletion({
        requester,
        indexName,
        taskID,
        options,
        loopInfo: {
          loop: currentLoop,
        },
      })
    );
  });
}
