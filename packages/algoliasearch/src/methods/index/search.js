// @flow
import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function search(
  params: SearchParameters = {},
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
    path: `/1/indexes/${indexName}/query`,
    body: { params },
    requestOptions,
    requestType: 'read',
  });
}
