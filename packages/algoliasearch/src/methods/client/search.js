// @flow

type SearchRequest = {| indexName: IndexName, params: Parameters |};

export default function search(req: RequestMethod, requests: SearchRequest[]) {
  return req({
    method: 'POST',
    path: '/1/indexes/*/queries',
    body: { requests },
  });
}
