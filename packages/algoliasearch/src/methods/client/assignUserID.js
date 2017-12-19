// @flow

import type { UserID, ClusterID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function assignUserID(
  { cluster, userID }: { cluster: ClusterID, userID: UserID },
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
    path: `/1/clusters/mapping`,
    body: { cluster },
    requestOptions: {
      ...requestOptions,
      // todo: just `userID`?
      'X-Algolia-User-ID': userID,
    },
    requestType: 'read',
  });
}
