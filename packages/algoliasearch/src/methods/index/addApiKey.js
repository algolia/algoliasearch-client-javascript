// @flow

import type { RequestMethod, IndexName } from '../../types';

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
  req: RequestMethod,
  indexName: IndexName,
  body: Parameters
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/keys/`,
    body,
  });
}
