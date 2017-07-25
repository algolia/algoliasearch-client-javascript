// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, IndexName, ObjectID } from '../../types';

export default function getObjects(
  req: RequestMethod,
  indexName: IndexName,
  objects: Object[]
) {
  if (!Array.isArray(objects)) {
    throw pluralError('addObject');
  }

  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: {
      requests: objects.map(object => ({
        action: 'addObject',
        body: object,
      })),
    },
  });
}
