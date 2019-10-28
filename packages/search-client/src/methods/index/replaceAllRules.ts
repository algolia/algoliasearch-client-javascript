import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { Rule } from '../../types/Rule';
import { SaveObjectsOptions } from '../../types/SaveObjectsOptions';
import { SaveRulesOptions } from '../../types/SaveRulesOptions';
import { SaveRulesResponse } from '../../types/SaveRulesResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasSaveRules, saveRules } from './saveRules';

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
