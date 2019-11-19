import { addMethod, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveObjectsOptions, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { saveRules } from '.';

export const replaceAllRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasReplaceAllRules => {
  return {
    ...base,
    replaceAllRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      return addMethod(base, saveRules).saveRules(rules, {
        ...requestOptions,
        clearExistingRules: true,
      });
    },
  };
};

export type HasReplaceAllRules = {
  readonly replaceAllRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
};
