// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, IndexName, ObjectID } from '../../types';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects(
  req: RequestMethod,
  indexName: IndexName,
  objectIDs: ObjectID[],
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectIDs)) {
    throw pluralError('getObject');
  }

  return req({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectIDs.map(objectID => ({
        indexName,
        objectID,
        attributesToRetrieve,
      })),
    },
  });
}
