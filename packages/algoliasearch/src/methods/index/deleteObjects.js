// @flow

import { pluralError } from 'algoliasearch-errors';
import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function deleteObjects(
  { objectIDs }: { objectIDs: ObjectID[] },
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
    requestOptions,
    requestType: 'write',
  });
}
