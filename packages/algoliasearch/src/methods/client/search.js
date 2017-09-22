// @flow
import type { IndexName, SearchParameters } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type SearchRequest = {|
  indexName: IndexName,
  params: SearchParameters,
|};

export default function search({
  requester,
  requests,
  options,
}: {
  requester: RequestMethod,
  requests: SearchRequest[],
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: '/1/indexes/*/queries',
    body: { requests },
    options,
    requestType: 'read',
  });
}
