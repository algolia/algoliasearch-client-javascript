import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

import { ClearRulesOptions, DeleteResponse, SearchIndex, waitTask } from '../..';

export const clearRules = (base: SearchIndex) => {
  return (
    requestOptions?: RequestOptions & ClearRulesOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
    }

    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/rules/clear', base.indexName),
        },
        mappedRequestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
