import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

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
