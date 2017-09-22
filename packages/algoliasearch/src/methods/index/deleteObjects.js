// @flow

import { pluralError } from '../../errors';
import type { IndexName, ObjectID } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getObjects({
  requester,
  indexName,
  objectIDs,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objectIDs: ObjectID[],
  options: RequestOptions,
}) {
  if (!Array.isArray(objectIDs)) {
    throw pluralError('deleteObject');
  }

  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: {
      requests: objectIDs.map(objectID => ({
        action: 'deleteObject',
        body: {
          objectID,
        },
      })),
    },
    options,
    requestType: 'write',
  });
}
