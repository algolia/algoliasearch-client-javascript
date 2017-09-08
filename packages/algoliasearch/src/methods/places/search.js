// @flow
import type {
  RequestMethod,
  SearchParameters,
  RequestOptions,
} from '../../types';

export default function search(
  params: SearchParameters,
  {
    requester,
    requestOptions,
  }: {
    requestOptions?: RequestOptions,
    requester: RequestMethod,
  } = {}
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/places/query`,
    body: { params },
    options: requestOptions,
    requestType: 'read',
  });
}
