// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, ObjectID, RequestOptions } from '../../types';
import type { GetObjectOptions } from '../index/getObject';

export default function getPlaces({
  requester,
  objectIDs,
  options = {},
  requestOptions,
}: {
  requester: RequestMethod,
  objectIDs: ObjectID[],
  options: GetObjectOptions,
  requestOptions?: RequestOptions,
}) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('getObject');
  }
  if (objectIDs.length === 0) {
    throw new Error('You need to have at least one place to retrieve');
  }

  const { attributesToRetrieve } = options;
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
    options: requestOptions,
  });
}
