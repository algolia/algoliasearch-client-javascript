/* eslint-disable valid-jsdoc */
// @flow

import type {
  RequestMethod,
  IndexName,
  Parameters,
  Result,
  TaskID,
} from './types';

export function clear(req: RequestMethod, indexName: IndexName) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/clear`,
  });
}

export function copy(
  req: RequestMethod,
  indexName: IndexName,
  destination: IndexName
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'copy', destination },
  });
}

export function remove(req: RequestMethod, indexName: IndexName) {
  return req({
    method: 'DELETE',
    path: `/1/indexes/${indexName}`,
  });
}

export function browse(
  req: RequestMethod,
  indexName: IndexName,
  params: Parameters
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
  });
}

export function browseFrom(
  req: RequestMethod,
  indexName: IndexName,
  cursor: string
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: { cursor },
  });
}

export function move(
  req: RequestMethod,
  indexName: IndexName,
  destination: IndexName
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'move', destination },
  });
}

export function search(
  req: RequestMethod,
  indexName: IndexName,
  params: Parameters
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
    forceReadHosts: true,
  });
}

export function similarSearch(
  req: RequestMethod,
  indexName: IndexName,
  params: Parameters
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
    forceReadHosts: true,
  });
}

type LoopInfo = { loop?: number, baseDelay?: number, maxDelay?: number };

export function waitTask(
  req: RequestMethod,
  indexName: IndexName,
  taskID: TaskID,
  loopInfo: LoopInfo = {}
): Promise<Result> {
  const { loop = 0, baseDelay = 250, maxDelay = 10000 } = loopInfo;
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/task/${taskID}`,
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
      waitTask((req: RequestMethod), (indexName: IndexName), (taskID: TaskID), {
        loop: currentLoop,
      })
    );
  });
}
