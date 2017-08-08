// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, ObjectID, RequestOptions } from '../../types';

export default function getPlaces({
  requester,
  objectIDs,
  attributesToRetrieve,
  options,
}: {
  requester: RequestMethod,
  objectIDs: ObjectID[],
  attributesToRetrieve?: string[],
  options?: RequestOptions,
}) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('getObject');
  }
  if (objectIDs.length === 0) {
    throw new Error('You need to have at least one place to retrieve');
  }
  const attrs = attributesToRetrieve && {
    attributesToRetrieve: attributesToRetrieve.join(','),
  };

  return requester({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectIDs.map(objectID => ({
        indexName: 'places',
        objectID,
        ...attrs,
      })),
    },
    requestType: 'read',
    options,
  });
}
