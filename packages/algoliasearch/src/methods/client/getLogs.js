// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getLogs(
  {
    offset = 0,
    length = 10,
  }: {
    offset?: number,
    length?: number,
    indexName?: IndexName,
    type?: 'all' | 'query' | 'build' | 'error',
  } = {},
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'GET',
    path: '/1/logs',
    qs: { offset, length },
    requestOptions,
    requestType: 'read',
  });
}
