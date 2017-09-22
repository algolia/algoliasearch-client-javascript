// @flow

import type { ObjectID } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

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
