// @flow

import type { RequestMethod, IndexName, BatchActions } from '../../types';

export type IndexBatchRequest = {|
  action: BatchActions,
  body?: Object,
|};

export default function batch(
  req: RequestMethod,
  indexName: IndexName,
  requests: IndexBatchRequest[]
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: { requests },
    requestType: 'write',
  });
}
