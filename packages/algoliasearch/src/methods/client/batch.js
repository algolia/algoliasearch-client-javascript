// @flow

import type {
  RequestMethod,
  BatchActions,
  IndexName,
  RequestOptions,
} from '../../types';

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
