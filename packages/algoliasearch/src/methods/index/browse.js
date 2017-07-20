// @flow

import type { RequestMethod, IndexName, Parameters } from '../../types';

export default function browse(
  req: RequestMethod,
  indexName: IndexName,
  params: Parameters
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: params,
  });
}
