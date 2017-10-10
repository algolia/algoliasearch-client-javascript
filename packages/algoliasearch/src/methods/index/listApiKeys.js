// @flow

import type { IndexName, ApiKey } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getRule(
  {
    apiKey,
  }: {
    apiKey: ApiKey,
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
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/keys/${apiKey}`,
    requestOptions,
    requestType: 'read',
  });
}
