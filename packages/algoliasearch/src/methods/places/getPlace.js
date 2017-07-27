// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, ObjectID, GetObjectOptions } from '../../types';

export default function getObjects(
  req: RequestMethod,
  objectID: ObjectID,
  options: GetObjectOptions
) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  return req({
    method: 'GET',
    path: `/1/indexes/places/${objectID}`,
    qs: { attributes: attributesToRetrieve },
  });
}
