// @flow

import type {
  RequestMethod,
  IndexName,
  ObjectID,
  RequestOptions,
} from '../../types';

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
