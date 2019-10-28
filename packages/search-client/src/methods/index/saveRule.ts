import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveRuleResponse } from '../types/SaveRuleResponse';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveRule = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin = waitTask(base);

  return class extends mixin implements HasSaveRule {
    public saveRule(
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
    }
  };
};

export type HasSaveRule = {
  readonly saveRule: (
    rule: Rule,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveRuleResponse>>;
};
