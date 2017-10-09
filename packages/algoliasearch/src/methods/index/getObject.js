// @flow

import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects(
  {
    objectID,
    attributesToRetrieve = [],
  }: {
    objectID: ObjectID,
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
  const attributes =
    attributesToRetrieve.length === 0 ? null : attributesToRetrieve.join(',');

  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/${objectID}`,
    qs: { attributes },
    requestOptions,
    requestType: 'read',
  });
}
