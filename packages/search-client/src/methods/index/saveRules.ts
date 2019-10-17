import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode, WaitablePromise } from '@algolia/support';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveRulesOptions } from '../types/SaveRulesOptions';
import { SaveRulesResponse } from '../types/SaveRulesResponse';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveRules = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin = waitTask(base);

  return class extends mixin implements HasSaveRules {
    public saveRules(
      rules: readonly Rule[],
      requestOptions?: RequestOptions & SaveRulesOptions
    ): Readonly<WaitablePromise<SaveRulesResponse>> {
      const options = mapRequestOptions(requestOptions);
      const clearExistingRules = popRequestOption<boolean>(
        requestOptions,
        'clearExistingRules',
        false
      );

      if (clearExistingRules === true) {
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.clearExistingRules = 'true';
      }

      return WaitablePromise.from<SaveRulesResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/rules/batch', this.indexName),
            data: rules,
          },
          options
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
