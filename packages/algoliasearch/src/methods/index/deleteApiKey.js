// @flow

import type { IndexName, ApiKey } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function clearSynonyms(
  { key }: { key: ApiKey },
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/${indexName}/keys/${key}`,
    requestType: 'write',
    requestOptions,
  });
}
