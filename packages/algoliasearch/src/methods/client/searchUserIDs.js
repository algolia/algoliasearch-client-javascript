// @flow
import type { ClusterID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function searchUserIDs(
  body: {
    cluster: ClusterID,
    query?: string,
    page?: number,
    hitsPerPage?: number,
  },
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
    path: `/1/clusters/mapping/search`,
    body,
    requestOptions,
    requestType: 'read',
  });
}
