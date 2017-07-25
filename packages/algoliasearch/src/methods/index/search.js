// @flow
import type { RequestMethod, IndexName, SearchParameters } from '../../types';

export default function search(
  req: RequestMethod,
  indexName: IndexName,
  params: SearchParameters
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
  });
}
