// @flow

import type { RequestMethod, IndexName, RequestOptions } from '../../types';

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
