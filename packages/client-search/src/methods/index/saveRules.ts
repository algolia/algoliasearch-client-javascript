import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { Rule, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const saveRules = (base: SearchIndex) => {
  return (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveRulesOptions
  ): Readonly<WaitablePromise<SaveRulesResponse>> => {
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
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/rules/batch', base.indexName),
          data: rules,
        },
        options
      )
    ).onWait((response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
  };
};
