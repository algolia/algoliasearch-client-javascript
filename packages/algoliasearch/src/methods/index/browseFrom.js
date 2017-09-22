// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function browseFrom(
  requester: RequestMethod,
  indexName: IndexName,
  cursor: string
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/browse`,
    qs: { cursor },
    requestType: 'read',
  });
}
