// @flow

import type { RequestMethod, ObjectID, RequestOptions } from '../../types';

export default function getPlace({
  requester,
  objectID,
  options = {},
  requestOptions,
}: {
  requester: RequestMethod,
  objectID: ObjectID,
  options: GetObjectOptions,
  requestOptions?: RequestOptions,
}) {
  const { attributesToRetrieve } = options;
  const attributes = attributesToRetrieve && {
    attributes: attributesToRetrieve.join(','),
  };

  return requester({
    method: 'GET',
    path: `/1/indexes/places/${objectID}`,
    qs: { ...attributes },
    requestType: 'read',
    options: requestOptions,
  });
}
