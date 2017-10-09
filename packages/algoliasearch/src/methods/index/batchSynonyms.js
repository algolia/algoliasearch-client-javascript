// @flow

import type { IndexName, Synonym } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function batchRules(
  { synonyms }: { synonyms: Synonym[] },
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
    method: 'POST',
    path: `/1/indexes/${indexName}/synonyms/batch`,
    body: { synonyms },
    requestType: 'write',
    requestOptions,
  });
}
