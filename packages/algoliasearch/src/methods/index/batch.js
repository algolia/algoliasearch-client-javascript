// @flow

import type { RequestMethod, IndexName, IndexBatchRequest } from '../../types';

export default function batch(
  req: RequestMethod,
  indexName: IndexName,
  requests: IndexBatchRequest[]
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: { requests },
  });
}
