// @flow

import { pluralError } from '../../../../algoliasearch-errors';
import type { IndexName, AlgoliaObject } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function addObjects(
  { objects }: { objects: AlgoliaObject[] },
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
  if (!Array.isArray(objects)) {
    throw pluralError('addObject');
  }

  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/batch`,
    body: {
      requests: objects.map(object => ({
        action: 'addObject',
        body: object,
      })),
    },
    requestOptions,
    requestType: 'write',
  });
}
