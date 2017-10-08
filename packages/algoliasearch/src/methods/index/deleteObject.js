// @flow

import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getObjects(
  { objectID }: { objectID: ObjectID },
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
    method: 'DELETE',
    path: `/1/indexes/${indexName}/${objectID}`,
    requestType: 'write',
    requestOptions,
  });
}
