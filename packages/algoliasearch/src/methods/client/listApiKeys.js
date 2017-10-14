// @flow

import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getApiKey(
  _: void,
  {
    requester,
    requestOptions,
  }: {
    requester: RequestMethod,
    requestOptions?: RequestOptions,
  }
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/keys`,
    requestType: 'read',
    requestOptions,
  });
}
