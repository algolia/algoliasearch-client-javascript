// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, ObjectID } from '../../types';
import type { GetObjectOptions } from '../index/getObject';

export default function getObjects(
  req: RequestMethod,
  objectID: ObjectID[],
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectID)) {
    throw pluralError('getObject');
  }

  return req({
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
