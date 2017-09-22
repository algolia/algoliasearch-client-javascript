// @flow
import type { SearchParameters } from 'algoliasearch/types';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

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
