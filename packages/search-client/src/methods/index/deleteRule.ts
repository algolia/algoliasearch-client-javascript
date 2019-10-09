import { Method } from '@algolia/requester-types';
import { ConstructorOf, endpoint, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { DeleteRuleResponse } from '../types/DeleteRuleResponse';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteRule = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasDeleteRule {
    public deleteRule(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteRuleResponse>> {
      return WaitablePromise.from<DeleteRuleResponse>(
        this.transporter.write(
          {
            method: Method.Delete,
            path: endpoint(`1/indexes/%s/rules/%s`, this.indexName, objectID),
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasDeleteRule = {
  readonly deleteRule: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteRuleResponse>>;
};
