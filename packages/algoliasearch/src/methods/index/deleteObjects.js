// @flow

import { pluralError } from '../../errors';
import type {
  RequestMethod,
  IndexName,
  ObjectID,
  RequestOptions,
} from '../../types';

export default function getObjects({
  requester,
  indexName,
  objectIDs,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objectIDs: ObjectID[],
  options: RequestOptions,
}) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('deleteObject');
  }

  return requester({
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
    options,
    requestType: 'write',
  });
}
