// @flow

import { pluralError } from '../../errors';
import type { RequestMethod, IndexName, RequestOptions } from '../../types';

export default function getObjects({
  requester,
  indexName,
  objects,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  objects: Object[],
  options?: RequestOptions,
}) {
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
    options,
  });
}
