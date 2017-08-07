// @flow

import type { RequestMethod, IndexName, SearchParameters } from '../../types';

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
