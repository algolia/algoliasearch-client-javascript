// @flow

import type { RequestMethod, IndexName, SearchParameters } from '../../types';

export default function browse(
  req: RequestMethod,
  indexName: IndexName,
  params: SearchParameters
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
  });
}
