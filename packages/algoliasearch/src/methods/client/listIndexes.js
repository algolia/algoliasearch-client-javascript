// @flow

import type { RequestMethod, RequestOptions } from '../../types';

type Params = {|
  page?: number,
|};

export default function listIndexes({
  requester,
  params = {},
  options,
}: {
  requester: RequestMethod,
  params?: Params,
  options?: RequestOptions,
}) {
  return requester({
    method: 'GET',
    path: '/1/indexes',
    qs: params,
    options,
  });
}
