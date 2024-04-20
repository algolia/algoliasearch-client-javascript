import { WaitablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

import { Rule, SaveRuleResponse, saveRules, SaveRulesOptions, SearchIndex } from '../..';

export const saveRule = (base: SearchIndex) => {
  return (
    rule: Rule,
    requestOptions?: RequestOptions & SaveRulesOptions
  ): Readonly<WaitablePromise<SaveRuleResponse>> => {
    return saveRules(base)([rule], requestOptions);
  };
};
