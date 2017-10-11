// @flow

import { pluralError } from '../../errors';
import type { IndexName, Attribute, AlgoliaValue } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type Operation = {|
  _operation: 'Increment' | 'Decrement' | 'Add' | 'Remove' | 'AddUnique',
  value: any,
|};

type OperationObject = { [key: Attribute]: AlgoliaValue | Operation };

export default function partialUpdateObjects(
  { objects }: { objects: OperationObject[] },
  {
    requester,
    indexName,
    requestOptions,
    // todo: figure out consistency with singular method
    createIfNotExists = true,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
    createIfNotExists?: boolean,
  }
) {
  if (!Array.isArray(objects)) {
    throw pluralError('partialUpdateObject');
  }

  const ids = objects.map(({ objectID }) => objectID);
  if (ids.indexOf(undefined) !== -1) {
    throw new Error(
      `You supplied an object without objectID to partialUpdateObjects.

body: ${JSON.stringify(objects)}`
    );
  }

  const action = createIfNotExists
    ? 'partialUpdateObject'
    : 'partialUpdateObjectNoCreate';

  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/partial`,
    body: {
      requests: objects.map(object => ({
        action,
        objectID: object.objectID,
        body: object,
      })),
    },
    requestType: 'write',
    requestOptions,
  });
}
