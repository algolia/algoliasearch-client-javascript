// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function browseFrom(
  requester: RequestMethod,
  indexName: IndexName,
  cursor: string
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: { cursor },
    requestType: 'read',
  });
}
