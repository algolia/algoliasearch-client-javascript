// @flow

import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function listIndexes(
  params: { page?: number } = {},
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
    path: '/1/indexes',
    qs: params,
    requestOptions,
    requestType: 'write',
  });
}
