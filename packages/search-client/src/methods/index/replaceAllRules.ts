import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter-types';

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
  const Mixin = saveRules(base);

  return class extends Mixin implements HasReplaceAllRules {
    public replaceAllRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      const options = mapRequestOptions(requestOptions !== undefined ? requestOptions : {});

      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.clearExistingRules = '1';

      return this.saveRules(rules, requestOptions);
    }
  };
};

export type HasReplaceAllRules = {
  readonly replaceAllRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
};
