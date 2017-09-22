// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type Parameters = {
  offset?: number,
  length?: number,
  indexName?: IndexName,
  type?: 'all' | 'query' | 'build' | 'error',
};

export default function getLogs({
  requester,
  params = {},
  requestOptions,
}: {
  requester: RequestMethod,
  params?: Parameters,
  requestOptions?: RequestOptions,
}) {
  const { offset = 0, length = 10 } = params;
  return requester({
    method: 'GET',
    path: '/1/logs',
    qs: { offset, length },
    options: requestOptions,
    requestType: 'read',
  });
}
