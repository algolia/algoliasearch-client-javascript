// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function moveIndex(
  req: RequestMethod,
  indexName: IndexName,
  destination: IndexName
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/operation`,
    body: { operation: 'move', destination },
  });
}
