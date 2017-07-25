// @flow

import type { RequestMethod } from '../../types';

export default function listIndexes(
  req: RequestMethod,
  params: {
    page?: number,
  } = {}
) {
  return req({
    method: 'GET',
    path: '/1/indexes',
    qs: params,
  });
}
