// @flow

import type { RequestMethod, ClientBatchRequest } from '../../types';

export default function batch(
  req: RequestMethod,
  requests: ClientBatchRequest[]
) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/batch',
    body: { requests },
  });
}
