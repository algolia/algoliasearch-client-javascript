// @flow

import { pluralError } from '../../errors';
import type { ObjectID } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getPlaces(
  {
    objectIDs,
    attributesToRetrieve,
  }: {
    objectIDs: ObjectID[],
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
    options: requestOptions,
  });
}
