// @flow

import type { IndexName } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function deleteIndex({
  requester,
  indexName,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  options?: RequestOptions,
}) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/${indexName}`,
    options,
    requestType: 'write',
  });
}
