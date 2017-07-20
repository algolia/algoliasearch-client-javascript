// @flow

import type { RequestMethod, ListIndicesParameters } from '../../types';

export default function listIndexes(
  req: RequestMethod,
  params: ListIndicesParameters = {}
) {
  return req({
    method: 'GET',
    path: '/1/indexes',
    qs: params,
  });
}
