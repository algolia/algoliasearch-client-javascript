// @flow

import type { ApiKeyOptions, IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function addApiKey(
  body: ApiKeyOptions,
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/keys/`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
