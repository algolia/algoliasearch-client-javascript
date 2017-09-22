// @flow

import type { IndexName, Rule } from 'types/Algolia';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type ExtraOptions = {|
  forwardToReplicas?: boolean,
  clearExistingRules?: boolean,
|};

type Options = {
  ...RequestOptions,
  ...ExtraOptions,
};

export default function batchRules({
  requester,
  indexName,
  rules,
  options,
}: {
  requester: RequestMethod,
  indexName: IndexName,
  rules: Rule[],
  options: Options,
}) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/rules/batch`,
    qs: options,
    body: { rules },
    requestType: 'write',
  });
}
