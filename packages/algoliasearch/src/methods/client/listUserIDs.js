// @flow

import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function listUserIDs(
  body: { page?: number, hitsPerPage?: number },
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
    path: `/1/clusters/mapping`,
    body,
    requestOptions,
    requestType: 'read',
  });
}
