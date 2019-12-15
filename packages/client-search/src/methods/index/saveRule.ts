import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveRuleResponse, SearchIndex, waitTask } from '../..';
import { SaveRulesOptions } from '../../types';

export const saveRule = (base: SearchIndex) => {
  return (
    rule: Rule,
    requestOptions?: RequestOptions & SaveRulesOptions
  ): Readonly<WaitablePromise<SaveRuleResponse>> => {
    return createWaitablePromise<SaveRuleResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Put,
          path: encode('1/indexes/%s/rules/%s', base.indexName, rule.objectID),
          data: rule,
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
