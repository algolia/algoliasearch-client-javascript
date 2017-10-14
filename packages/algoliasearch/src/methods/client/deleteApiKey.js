// @flow

import type { ApiKey } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function deleteApiKey(
  { key }: { key: ApiKey },
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'DELETE',
    path: `/1/indexes/keys/${key}`,
    requestType: 'write',
    requestOptions,
  });
}
