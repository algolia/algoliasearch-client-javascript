// @flow

import type { IndexName, ObjectID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects({
  requester,
  indexName,
  objectID,
  params,
  requestOptions,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID,
  params: GetObjectOptions,
  requestOptions?: RequestOptions,
}) {
  const { attributesToRetrieve: attrs } = params;
  const attributesToRetrieve = attrs.join(',');

  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/${objectID}`,
    qs: { attributes: attributesToRetrieve },
    requestOptions,
    requestType: 'read',
  });
}
