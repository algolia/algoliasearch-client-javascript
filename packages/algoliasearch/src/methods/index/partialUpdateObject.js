// @flow

import type { IndexName, Attribute, AlgoliaValue } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type Operation = {|
  _operation: 'Increment' | 'Decrement' | 'Add' | 'Remove' | 'AddUnique',
  value: any,
|};

type OperationObject = { [key: Attribute]: AlgoliaValue | Operation };

export default function addObject(
  body: { ...OperationObject },
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
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/${body.objectId}/partial`,
    body,
    requestType: 'write',
    requestOptions,
  });
}
