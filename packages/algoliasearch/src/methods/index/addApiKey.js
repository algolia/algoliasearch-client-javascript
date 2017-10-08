// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type ACL =
  | 'search'
  | 'browse'
  | 'addObject'
  | 'deleteObject'
  | 'deleteIndex'
  | 'settings'
  | 'editSettings'
  | 'analytics'
  | 'listIndexes';

export type Parameters = {|
  acls?: ACL[],
  description?: string,
  maxHitsPerQuery?: number,
  maxQueriesPerIPPerHour?: number,
  queryParameters?: string,
  referers?: string[],
  validity?: number,
|};

export default function addApiKey(
  body: Parameters,
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
    method: 'POST',
    path: `/1/indexes/${indexName}/keys/`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
