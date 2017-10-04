// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function deleteIndex(
  { indexName }: { indexName: IndexName },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/${indexName}`,
    requestOptions,
    requestType: 'write',
  });
}
