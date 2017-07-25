// @flow
import type { RequestMethod, SearchParameters } from '../../types';

export default function search(req: RequestMethod, params: SearchParameters) {
  return req({
    method: 'POST',
    path: `/1/indexes/places/query`,
    body: { params },
  });
}
