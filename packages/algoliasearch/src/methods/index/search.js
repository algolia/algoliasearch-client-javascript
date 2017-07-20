// @flow
import type { RequestMethod, IndexName, Parameters } from '../../../types';

export default function search(
  req: RequestMethod,
  indexName: IndexName,
  params: Parameters
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
  });
}
