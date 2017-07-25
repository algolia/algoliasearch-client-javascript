// @flow

import type { RequestMethod, BatchActions, IndexName } from '../../types';

export type ClientBatchRequest = {|
  action: BatchActions,
  indexName: IndexName,
  body?: Object,
|};

export default function batch(
  req: RequestMethod,
  requests: ClientBatchRequest[]
) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: { requests },
  });
}
