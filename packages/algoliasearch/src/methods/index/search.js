// @flow
import type {
  RequestMethod,
  IndexName,
  SearchParameters,
  RequestOptions,
} from '../../types';

export default function search({
  requester,
  indexName,
  params,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  params: SearchParameters,
  options?: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/query`,
    body: { params },
    options,
  });
}
