import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SaveRulesOptions } from '../types/SaveRulesOptions';
import { SaveRulesResponse } from '../types/SaveRulesResponse';
import { HasWaitTask, waitTask } from './waitTask';

export const saveRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasSaveRules => {
  return {
    ...waitTask(base),
    saveRules(
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
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasSaveRules = {
  readonly saveRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
};
