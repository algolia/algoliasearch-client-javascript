import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { Rule, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { HasWaitTask, waitTask } from '.';

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
        // eslint-disable-next-line functional/immutable-data
        options.queryParameters.clearExistingRules = 'true';
      }

      return createWaitablePromise<SaveRulesResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Post,
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
