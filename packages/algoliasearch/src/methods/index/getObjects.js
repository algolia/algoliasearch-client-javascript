// @flow

import { pluralError } from '../../errors';
import type { IndexName, ObjectID } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type GetObjectOptions = {| attributesToRetrieve: string[] |};

export default function getObjects({
  requester,
  indexName,
  objectIDs,
  params,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objectIDs: ObjectID[],
  params: GetObjectOptions,
  options: RequestOptions,
}) {
  const { attributesToRetrieve: attrs } = params;
  const attributesToRetrieve = attrs.join(',');

  if (!Array.isArray(objectIDs)) {
    throw pluralError('getObject');
  }

  return requester({
    method: 'POST',
    path: '/1/indexes/*/objects',
    body: {
      requests: objectIDs.map(objectID => ({
        indexName,
        objectID,
        attributesToRetrieve,
      })),
    },
    options,
    requestType: 'read',
  });
}
