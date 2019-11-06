import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveObjectsOptions, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { HasSaveRules, saveRules } from '.';

export const replaceAllRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveRules & HasReplaceAllRules => {
  return {
    ...saveRules(base),
    replaceAllRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      return this.saveRules(rules, {
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
