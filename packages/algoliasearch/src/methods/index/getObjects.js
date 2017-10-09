// @flow

import { pluralError } from '../../errors';
import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getObjects(
  {
    objectIDs,
    attributesToRetrieve: attrs = [],
  }: {
    objectIDs: ObjectID[],
    attributesToRetrieve?: string[],
  },
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
  }
) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('getObject');
  }

  const attributesToRetrieve = attrs.length === 0 ? null : attrs.join(',');

  return requester({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectIDs.map(objectID => ({
        indexName,
        objectID,
        attributesToRetrieve,
      })),
    },
    requestOptions,
    requestType: 'read',
  });
}
