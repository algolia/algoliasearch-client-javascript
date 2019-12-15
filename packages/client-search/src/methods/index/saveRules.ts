import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

import { Rule, SaveRulesOptions, SaveRulesResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const saveRules = (base: SearchIndex) => {
  return (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveRulesOptions
  ): Readonly<WaitablePromise<SaveRulesResponse>> => {
    const { forwardToReplicas, clearExistingRules, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);

    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
    }

    if (clearExistingRules) {
      mappedRequestOptions.queryParameters.clearExistingRules = 1; // eslint-disable-line functional/immutable-data
    }

    return createWaitablePromise<SaveRulesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/rules/batch', base.indexName),
          data: rules,
        },
        mappedRequestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
