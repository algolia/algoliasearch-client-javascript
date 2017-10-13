// @flow
import type { IndexName, SynonymType } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function searchSynonyms(
  body: {
    query?: string,
    type?: SynonymType,
    page?: number,
    hitsPerPage?: number,
  } = {},
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
    path: `/1/indexes/${indexName}/synonyms/search`,
    body,
    requestOptions,
    requestType: 'read',
  });
}
