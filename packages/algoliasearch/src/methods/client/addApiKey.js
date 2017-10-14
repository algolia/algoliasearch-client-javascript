// @flow

import type { ApiKeyOptions } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function addApiKey(
  body: ApiKeyOptions,
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/keys/`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
