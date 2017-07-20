// @flow
import type { RequestMethod, Parameters } from '../../types';

export default function search(req: RequestMethod, params: Parameters) {
  return req({
    method: 'POST',
    path: `/1/indexes/places/query`,
    body: { params },
  });
}
