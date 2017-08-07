// @flow

import type { RequestMethod, IndexName, ObjectID } from '../../types';

export default function getObjects(
  requester: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID
) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/${indexName}/${objectID}`,
    requestType: 'write',
  });
}
