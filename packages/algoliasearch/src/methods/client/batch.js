// @flow

import type { IndexName, BatchActions } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type ClientBatchRequest = {|
  action: BatchActions,
  indexName: IndexName,
  body?: Object,
|};

export default function batch({
  requester,
  requests,
  options,
}: {
  requester: RequestMethod,
  requests: ClientBatchRequest[],
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: { requests },
    requestType: 'write',
    options,
  });
}
