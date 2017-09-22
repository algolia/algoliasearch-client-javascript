// @flow
import type { IndexName, SearchParameters } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function search({
  requester,
  indexName,
  params,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  params: SearchParameters,
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
    options,
    requestType: 'read',
  });
}
