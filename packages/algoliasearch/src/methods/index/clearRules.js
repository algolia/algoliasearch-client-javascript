// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

// todo: figure out what to do here, no first argument
export default function clearRules(
  _,
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
    method: 'GET',
    path: `/1/indexes/${indexName}/rules/clear`,
    requestType: 'write',
    requestOptions,
  });
}
