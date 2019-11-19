import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SaveRuleResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const saveRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveRule => {
  return {
    ...base,
    saveRule(
      rule: Rule,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SaveRuleResponse>> {
      return createWaitablePromise<SaveRuleResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Put,
            path: encode('1/indexes/%s/rules/%s', base.indexName, rule.objectID),
            data: rule,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
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
