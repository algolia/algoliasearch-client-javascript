// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function browse(
  requester: RequestMethod,
  indexName: IndexName,
  params: SearchParameters
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
    requestType: 'read',
  });
}
