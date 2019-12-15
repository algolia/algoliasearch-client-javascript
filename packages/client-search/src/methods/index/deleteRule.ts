import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex, waitTask } from '../..';

export const deleteRule = (base: SearchIndex) => {
  return (
    objectID: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    const { forwardToReplicas, ...options } = requestOptions || {};

    const mappedRequestOptions = createMappedRequestOptions(options);
    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
    }

    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
        },
        mappedRequestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
