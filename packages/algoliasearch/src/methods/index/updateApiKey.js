// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

// todo: move to main types
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

export default function updateApiKey(
  { key, ...body }: { key: string, ...Parameters },
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
  if (!key || typeof key !== 'string') {
    throw new Error(
      `To update an API key you need to pass it as 'key', you passed ${key}`
    );
  }
  return requester({
    method: 'PUT',
    path: `/1/indexes/${indexName}/keys/${key}`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
