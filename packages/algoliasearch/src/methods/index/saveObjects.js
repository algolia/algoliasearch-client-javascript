// @flow

import { pluralError, AlgoliaError } from 'algoliasearch-errors';
import type { IndexName, AlgoliaObject } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function saveObjects(
  { objects }: { objects: AlgoliaObject[] },
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
  if (!Array.isArray(objects)) {
    throw pluralError('saveObject');
  }

  const ids = objects.map(({ objectID }) => objectID);
  if (ids.indexOf(undefined) !== -1) {
    throw new AlgoliaError(
      `You supplied an object without objectID to saveObjects.

body: ${JSON.stringify(objects)}`
    );
  }

  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: {
      requests: objects.map(object => ({
        action: 'updateObject',
        objectID: object.objectID,
        body: object,
      })),
    },
    requestOptions,
    requestType: 'write',
  });
}
