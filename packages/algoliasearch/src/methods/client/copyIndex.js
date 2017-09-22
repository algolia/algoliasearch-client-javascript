// @flow

import type { IndexName } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function copyIndex({
  requester,
  indexName,
  destination,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  destination: IndexName,
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'copy', destination },
    options,
    requestType: 'write',
  });
}
