// @flow

import type { IndexName, BatchActions } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type ClientBatchRequest = {|
  action: BatchActions,
  indexName: IndexName,
  body?: Object,
|};

export default function batch(
  { requests }: { requests: ClientBatchRequest[] },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: { requests },
    requestType: 'write',
    requestOptions,
  });
}
