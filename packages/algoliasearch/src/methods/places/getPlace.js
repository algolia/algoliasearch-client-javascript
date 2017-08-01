// @flow

import type { RequestMethod, ObjectID } from '../../types';
import type { GetObjectOptions } from '../index/getObject';

export default function getPlace({
  requester,
  objectID,
  options,
}: {
  requester: RequestMethod,
  objectID: ObjectID,
  options: GetObjectOptions,
}) {
  const { attributesToRetrieve: attrs } = options;
  const attributesToRetrieve = attrs.join(',');

  return requester({
    method: 'GET',
    path: `/1/indexes/places/${objectID}`,
    qs: { attributes: attributesToRetrieve },
  });
}
