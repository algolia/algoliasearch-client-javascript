// @flow

import type { IndexName, SearchParameters } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function browse(
  requester: RequestMethod,
  indexName: IndexName,
  params: SearchParameters,
  requestOptions?: RequestOptions
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
    requestType: 'read',
    options: requestOptions,
  });
}
