// @flow

import type { UserID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function removeUserID(
  { userID }: { userID: UserID },
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
    path: `/1/clusters/mapping`,
    requestOptions: {
      ...requestOptions,
      // todo: just `userID`?
      'X-Algolia-User-ID': userID,
    },
    requestType: 'write',
  });
}
