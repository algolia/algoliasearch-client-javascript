// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function addObject(
  requester: RequestMethod,
  indexName: IndexName,
  body: Object
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/`,
    body,
    requestType: 'write',
  });
}
