// @flow
import type {
  RequestMethod,
  SearchParameters,
  RequestOptions,
} from '../../types';

export default function search({
  requester,
  params,
  options,
}: {
  requester: RequestMethod,
  params: SearchParameters,
  options: RequestOptions,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/places/query`,
    body: { params },
    options,
  });
}
