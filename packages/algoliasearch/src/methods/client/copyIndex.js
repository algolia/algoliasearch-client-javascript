// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function copyIndex(
  {
    indexName,
    destination,
  }: {
    indexName: IndexName,
    destination: IndexName,
  },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'copy', destination },
    requestOptions,
    requestType: 'write',
  });
}
