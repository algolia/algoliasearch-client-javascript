import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { Rule } from '../../types/Rule';
import { SaveRuleResponse } from '../../types/SaveRuleResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const saveRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasSaveRule => {
  return {
    ...waitTask(base),
    saveRule(
      rule: Rule,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SaveRuleResponse>> {
      return createWaitablePromise<SaveRuleResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Put,
            path: encode('1/indexes/%s/rules/%s', this.indexName, rule.objectID),
            data: rule,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasSaveRule = {
  readonly saveRule: (
    rule: Rule,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveRuleResponse>>;
};
