// @flow

import type { IndexName, Attribute, AlgoliaValue } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type Operation = {|
  _operation: 'Increment' | 'Decrement' | 'Add' | 'Remove' | 'AddUnique',
  value: any,
|};

type OperationObject = { [key: Attribute]: AlgoliaValue | Operation };

export default function addObject(
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
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/${body.objectId}/partial`,
    body,
    qs: { createIfNotExists },
    requestType: 'write',
    requestOptions,
  });
}
