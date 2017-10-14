// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function clearSynonyms(
  _: void,
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
    method: 'GET',
    path: `/1/indexes/${indexName}/synonyms/clear`,
    requestType: 'write',
    requestOptions,
  });
}
