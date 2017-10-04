// @flow

import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function browse(
  params: SearchParameters = {},
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  } = {}
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
    requestType: 'read',
    requestOptions,
  });
}
