// @flow
import type { RequestMethod, IndexName, SearchParameters } from '../../types';
export type SearchRequest = {|
  indexName: IndexName,
  params: SearchParameters,
|};

export default function search(req: RequestMethod, requests: SearchRequest[]) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/queries',
    body: { requests },
  });
}
