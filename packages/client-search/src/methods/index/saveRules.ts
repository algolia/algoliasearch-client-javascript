import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { mapRequestOptions, popRequestOption } from '@algolia/transporter/request-options';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { Rule } from '../../types/Rule';
import { SaveRulesOptions } from '../../types/SaveRulesOptions';
import { SaveRulesResponse } from '../../types/SaveRulesResponse';
import { SearchIndex } from '../../types/SearchIndex';
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
