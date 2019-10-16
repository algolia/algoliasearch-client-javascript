import { Method } from '@algolia/requester-types';
import { ConstructorOf, endpoint, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveRulesOptions } from '../types/SaveRulesOptions';
import { SaveRulesResponse } from '../types/SaveRulesResponse';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveRules = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasSaveRules {
    public saveRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      return WaitablePromise.from<SaveRulesResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: endpoint(`1/indexes/%s/rules/batch`, this.indexName),
            data: rules,
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasSaveRules = {
  readonly saveRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
};
