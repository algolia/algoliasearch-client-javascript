// @flow

import type { IndexName } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type IndexBatchRequest = {|
  action: BatchActions,
  body?: Object,
|};

export default function batch(
  requester: RequestMethod,
  indexName: IndexName,
  requests: IndexBatchRequest[]
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: { requests },
    requestType: 'write',
  });
}
