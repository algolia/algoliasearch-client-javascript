// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, ObjectID } from '../../types';
import type { GetObjectOptions } from '../index/getObject';

export default function getPlaces({
  requester,
  objectID,
  options,
}: {
  requester: RequestMethod,
  objectID: ObjectID[],
  options: GetObjectOptions,
}) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectID)) {
    throw pluralError('getObject');
  }

  return requester({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectID.map(id => ({
        indexName: 'places',
        objectID: id,
        attributesToRetrieve,
      })),
    },
  });
}
