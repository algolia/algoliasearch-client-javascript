// @flow

import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

// todo: DeleteByParameters
export default function deleteBy(
  params: ?SearchParameters = {},
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
    path: `/1/indexes/${indexName}/deleteBy`,
    body: { params },
    requestType: 'write',
    requestOptions,
  });
}
