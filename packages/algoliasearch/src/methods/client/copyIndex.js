// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type CopyIndexScope = 'settings' | 'synonyms' | 'rules';

export default function copyIndex(
  {
    indexName,
    destination,
    scope,
  }: {
    indexName: IndexName,
    destination: IndexName,
    scope: CopyIndexScope[],
  },
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
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'copy', destination, scope },
    requestOptions,
    requestType: 'write',
  });
}
