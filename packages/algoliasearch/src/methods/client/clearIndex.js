// @flow

import type { IndexName } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

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
