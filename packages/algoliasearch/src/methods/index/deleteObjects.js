// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, IndexName, ObjectID } from '../../types';

export default function getObjects(
  req: RequestMethod,
  indexName: IndexName,
  objectIDs: ObjectID[]
) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('deleteObject');
  }

  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: {
      requests: objectIDs.map(objectID => ({
        action: 'deleteObject',
        body: {
          objectID,
        },
      })),
    },
  });
}
