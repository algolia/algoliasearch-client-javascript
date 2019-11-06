import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveRuleResponse, SearchIndex } from '../..';
import { HasWaitTask, waitTask } from '.';

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
