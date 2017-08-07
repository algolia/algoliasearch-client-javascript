// @flow

import type { RequestMethod, IndexName } from '../../types';

export type Options = {| forwardToReplicas: boolean |};

export default function clearRules(
  requester: RequestMethod,
  indexName: IndexName,
  opts: Options
) {
  return requester({
    method: 'GET',
    path: `/1/indexes/${indexName}/rules/clear`,
    qs: { opts },
    requestType: 'write',
  });
}
