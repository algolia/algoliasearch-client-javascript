// @flow

import type { IndexName, ObjectID } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects({
  requester,
  indexName,
  objectID,
  params,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objectID: ObjectID,
  params: GetObjectOptions,
  options: RequestOptions,
}) {
  const { attributesToRetrieve: attrs } = params;
  const attributesToRetrieve = attrs.join(',');

  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/${objectID}`,
    qs: { attributes: attributesToRetrieve },
    options,
    requestType: 'read',
  });
}
