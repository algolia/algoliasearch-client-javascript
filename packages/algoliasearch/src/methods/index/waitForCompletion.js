// @flow

import type { RequestMethod, IndexName, Result, TaskID } from '../../types';

type LoopInfo = { loop?: number, baseDelay?: number, maxDelay?: number };

export default function waitForCompletion(
  req: RequestMethod,
  indexName: IndexName,
  taskID: TaskID,
  loopInfo: LoopInfo = {}
): Promise<Result> {
  const { loop = 0, baseDelay = 250, maxDelay = 10000 } = loopInfo;
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/task/${taskID}`,
    requestType: 'write',
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
      waitForCompletion(req, indexName, taskID, {
        loop: currentLoop,
      })
    );
  });
}
