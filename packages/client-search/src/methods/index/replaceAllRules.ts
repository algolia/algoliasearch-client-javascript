import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { saveRules } from '.';

export const replaceAllRules = (base: SearchIndex) => {
  return (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveRulesOptions
  ): Readonly<WaitablePromise<SaveRulesResponse>> => {
    return saveRules(base)(rules, {
      ...requestOptions,
      clearExistingRules: true,
    });
  };
};
