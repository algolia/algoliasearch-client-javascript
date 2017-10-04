// @flow

import type { IndexName, Synonym } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export type Options = {|
  forwardToReplicas?: boolean,
  replaceExistingSynonyms?: boolean,
|};

export default function batchRules(
  requester: RequestMethod,
  indexName: IndexName,
  rules: Synonym[],
  opts: Options,
  requestrequestOptions
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/rules/batch`,
    qs: opts,
    body: { rules },
    requestType: 'write',
    requestOptions,
  });
}
