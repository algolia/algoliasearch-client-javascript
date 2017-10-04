// @flow

import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

type Params = {|
  page?: number,
|};

export default function listIndexes({
  requester,
  params = {},
  requestOptions,
}: {
  requester: RequestMethod,
  params?: Params,
  requestOptions?: RequestOptions,
}) {
  return requester({
    method: 'GET',
    path: '/1/indexes',
    qs: params,
    requestOptions,
    requestType: 'write',
  });
}
