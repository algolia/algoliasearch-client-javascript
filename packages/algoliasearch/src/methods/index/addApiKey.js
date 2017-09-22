// @flow

import type { IndexName } from 'types/Algolia';
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

export default function addApiKey({
  requester,
  indexName,
  body,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  body: Parameters,
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/keys/`,
    body,
    options,
    requestType: 'write',
  });
}
