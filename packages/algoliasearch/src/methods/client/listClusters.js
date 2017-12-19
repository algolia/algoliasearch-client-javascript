// @flow

import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function listClusters(
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
    path: `/1/clusters`,
    requestOptions,
    requestType: 'read',
  });
}
