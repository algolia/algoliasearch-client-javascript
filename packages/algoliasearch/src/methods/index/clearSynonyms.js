// @flow

import type { RequestMethod, IndexName } from '../../types';

export type Options = {| forwardToReplicas: boolean |};

export default function clearSynonyms(
  req: RequestMethod,
  indexName: IndexName,
  opts: Options
) {
  return req({
    method: 'GET',
    path: `/1/indexes/${indexName}/synonyms/clear`,
    qs: { opts },
    requestType: 'write',
  });
}
