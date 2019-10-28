import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveObjectsOptions } from '../types/SaveObjectsOptions';
import { SaveRulesOptions } from '../types/SaveRulesOptions';
import { SaveRulesResponse } from '../types/SaveRulesResponse';
import { saveRules } from './saveRules';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const replaceAllRules = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = saveRules(base);

  return class extends mixin implements HasReplaceAllRules {
    public replaceAllRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      return this.saveRules(rules, {
        ...requestOptions,
        clearExistingRules: true,
      });
    }
  };
};

export type HasReplaceAllRules = {
  readonly replaceAllRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
};
