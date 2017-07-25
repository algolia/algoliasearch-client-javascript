// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function deleteIndex(req: RequestMethod, indexName: IndexName) {
  return req({
    method: 'DELETE',
    path: `/1/indexes/${indexName}`,
  });
}
