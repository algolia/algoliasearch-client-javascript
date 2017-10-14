// @flow

import type { ApiKey, ApiKeyOptions } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function updateApiKey(
  { key, ...body }: { key: ApiKey, ...ApiKeyOptions },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'PUT',
    path: `/1/indexes/keys/${key}`,
    body,
    requestOptions,
    requestType: 'write',
  });
}
