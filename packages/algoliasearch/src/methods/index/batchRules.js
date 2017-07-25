// @flow

import type { RequestMethod, IndexName, BatchActions, Rule } from '../../types';

export type Options = {|
  forwardToReplicas?: boolean,
  clearExistingRules?: boolean,
|};

export default function batchRules(
  req: RequestMethod,
  indexName: IndexName,
  rules: Rule[],
  opts: Options
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/rules/batch`,
    qs: opts,
    body: { rules },
  });
}
