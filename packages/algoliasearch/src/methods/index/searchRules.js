// @flow
import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function searchRules(
  body: {
    query?: string,
    anchoring?: string,
    context?: string,
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
    path: `/1/indexes/${indexName}/rules/search`,
    body,
    requestOptions,
    requestType: 'read',
  });
}
