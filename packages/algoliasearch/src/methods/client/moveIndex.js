// @flow

import type { RequestMethod, IndexName, RequestOptions } from '../../types';

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
