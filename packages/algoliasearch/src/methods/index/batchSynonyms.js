// @flow

import type { RequestMethod, IndexName, Synonym } from '../../types';

export type Options = {|
  forwardToReplicas?: boolean,
  replaceExistingSynonyms?: boolean,
|};

export default function batchRules(
  req: RequestMethod,
  indexName: IndexName,
  rules: Synonym[],
  opts: Options
) {
  return req({
    method: 'POST',
    path: `/1/indexes/${indexName}/rules/batch`,
    qs: opts,
    body: { rules },
  });
}
