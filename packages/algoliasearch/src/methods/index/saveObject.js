// @flow

import type { IndexName, AlgoliaObject } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function saveObject(
  body: AlgoliaObject,
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
  if (!body.objectID) {
    throw new Error(
      `You supplied an object without objectID to saveObject.

If you want to simply create an object without objectID, you can use addObject.

body: ${JSON.stringify(body)}`
    );
  }

  return requester({
    method: 'PUT',
    path: `/1/indexes/${indexName}/${body.objectID}`,
    body,
    requestType: 'write',
    requestOptions,
  });
}
