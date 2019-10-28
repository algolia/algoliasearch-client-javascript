import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveRuleResponse } from '../types/SaveRuleResponse';
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
      return WaitablePromise.from<SaveRuleResponse>(
        this.transporter.write(
          {
            method: Method.Put,
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
