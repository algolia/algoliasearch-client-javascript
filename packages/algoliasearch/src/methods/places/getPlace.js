// @flow

import type { RequestMethod, ObjectID } from '../../types';
import type { GetObjectOptions } from '../index/getObject';

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
