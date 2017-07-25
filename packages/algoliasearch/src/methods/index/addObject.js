// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function addObject(
  req: RequestMethod,
  indexName: IndexName,
  body: Object
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/`,
    body,
  });
}
