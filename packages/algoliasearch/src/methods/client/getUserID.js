// @flow

import type { UserID } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function getUserID(
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
    method: 'GET',
    path: `/1/clusters/mapping/${userID}`,
    requestOptions,
    requestType: 'read',
  });
}
