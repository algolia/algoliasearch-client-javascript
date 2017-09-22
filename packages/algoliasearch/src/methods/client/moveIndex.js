// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function moveIndex({
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
    body: { operation: 'move', destination },
    options,
    requestType: 'write',
  });
}
