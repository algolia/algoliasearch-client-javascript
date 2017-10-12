// @flow

import type { IndexName, Attribute, AlgoliaValue } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type Operation = {|
  _operation: 'Increment' | 'Decrement' | 'Add' | 'Remove' | 'AddUnique',
  value: any,
|};

type OperationObject = { [key: Attribute]: AlgoliaValue | Operation };

export default function partialUpdateObject(
  body: OperationObject,
  {
    requester,
    indexName,
    requestOptions,
    // todo: how to deal with this? I don't think it can be a RO
    createIfNotExists = true,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions?: RequestOptions,
    createIfNotExists?: boolean,
  }
) {
  const { objectID } = body;
  if (
    !objectID ||
    typeof objectID !== 'string' ||
    typeof objectID !== 'number'
  ) {
    throw new Error(
      `You supplied an object without objectID to partialUpdateObject, but this is required.

body: ${JSON.stringify(body)}`
    );
  }

  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/${objectID}/partial`,
    body,
    qs: { createIfNotExists },
    requestType: 'write',
    requestOptions,
  });
}
