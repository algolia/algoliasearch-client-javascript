// @flow

import type { RequestMethod, IndexName } from '../../types';

export default function clearIndex(req: RequestMethod, indexName: IndexName) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/clear`,
  });
}
