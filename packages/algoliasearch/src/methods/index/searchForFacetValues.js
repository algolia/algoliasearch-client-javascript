// @flow
import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function searchForFacetValues(
  {
    facetName,
    facetQuery,
    maxFacetHits,
    ...params
  }: {
    facetName: string,
    facetQuery?: string,
    maxFacetHits?: number /* > 1, < 100*/,
    ...SearchParameters,
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
    path: `/1/indexes/${indexName}/facets/${facetName}/query`,
    body: {
      params,
      facetQuery,
      maxFacetHits,
    },
    requestOptions,
    requestType: 'read',
  });
}
