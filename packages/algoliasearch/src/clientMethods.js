/* eslint-disable valid-jsdoc */
// @flow

import type {
  RequestMethod,
  ClientBatchRequest,
  Parameters,
  LogsParameters,
  ListIndicesParameters,
  IndexName,
} from './types';

export function batch(req: RequestMethod, requests: ClientBatchRequest[]) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: { requests },
  });
}
export function getLogs(req: RequestMethod, options: LogsParameters = {}) {
  const { offset = 0, length = 10 } = options;
  return req({
    method: 'GET',
    path: '/1/logs',
    qs: { offset, length },
  });
}
export function listIndexes(req: RequestMethod, params: ListIndicesParameters) {
  return req({
    method: 'GET',
    path: '/1/indexes',
    qs: params,
  });
}

type SearchRequest = {| indexName: IndexName, params: Parameters |};

export function search(req: RequestMethod, requests: SearchRequest[]) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/queries',
    body: { requests },
    forceReadHosts: true,
  });
}
