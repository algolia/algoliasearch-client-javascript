// @flow
import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type SearchRequest = {|
  indexName: IndexName,
  params: SearchParameters,
|};

export default function search(
  { requests = [] }: { requests: SearchRequest[] },
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
    path: '/1/indexes/*/queries',
    body: { requests },
    requestOptions,
    requestType: 'read',
  });
}
