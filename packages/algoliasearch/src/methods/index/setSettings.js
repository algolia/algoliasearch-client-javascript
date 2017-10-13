// @flow

import type { IndexName } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type Settings = Object;

export default function setSettings(
  body: Settings,
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
    method: 'PUT',
    path: `/1/indexes/${indexName}/settings`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
