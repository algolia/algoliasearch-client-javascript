// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function browseFrom(
  req: RequestMethod,
  indexName: IndexName,
  cursor: string
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: { cursor },
    requestType: 'read',
  });
}
