// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod } from 'algoliasearch-requester';

export default function addObject(
  requester: RequestMethod,
  indexName: IndexName,
  body: Object
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/`,
    body,
    requestType: 'write',
  });
}
