// @flow

import type {
  RequestMethod,
  IndexName,
  Rule,
  RequestOptions,
} from '../../types';

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
  });
}
