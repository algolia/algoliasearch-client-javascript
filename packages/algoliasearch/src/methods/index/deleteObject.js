// @flow

import type { RequestMethod, IndexName, ObjectID } from '../../types';

export default function getObjects(
  req: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID
) {
  return req({
    method: 'DELETE',
    path: `/1/indexes/${indexName}/${objectID}`,
    requestType: 'write',
  });
}
