// @flow

import type { IndexName, Rule } from 'algoliasearch';
import type { RequestMethod, RequestOptions } from 'algoliasearch-requester';

export default function batchRules(
  { rules }: { rules: Rule[] },
  {
    requester,
    indexName,
    requestOptions,
  }: {
    requester: RequestMethod,
    indexName: IndexName,
    requestOptions: RequestOptions,
  }
) {
  return requester({
    method: 'POST',
    path: `/1/indexes/${indexName}/rules/batch`,
    body: { rules },
    requestType: 'write',
    requestOptions,
  });
}
