// @flow

import type { IndexName, AlgoliaObject } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function addObject(
  body: AlgoliaObject,
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
    path: `/1/indexes/${indexName}/`,
    body,
    requestType: 'write',
    requestOptions,
  });
}
