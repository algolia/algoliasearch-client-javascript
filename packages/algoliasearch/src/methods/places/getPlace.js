// @flow

import type { RequestMethod, ObjectID, RequestOptions } from '../../types';

export default function getPlace(
  {
    objectID,
    attributesToRetrieve,
  }: {
    objectID: ObjectID,
    attributesToRetrieve: string[],
  },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  } = {}
) {
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
