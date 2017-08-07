// @flow

import type { RequestMethod, IndexName, RequestOptions } from '../../types';

export default function clearIndex({
  requester,
  indexName,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/clear`,
    options,
    requestType: 'write',
  });
}
