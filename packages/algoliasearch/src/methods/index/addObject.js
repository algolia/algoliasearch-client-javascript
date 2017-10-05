// @flow

import type { IndexName, RequestOptions, AlgoliaObject } from 'algoliasearch';
import type { RequestMethod } from 'algoliasearch-requester';

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
