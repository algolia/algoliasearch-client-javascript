import { createWaitablePromise, encode, Wait, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { BatchRequest, BatchResponse, SearchIndex, waitTask } from '../..';

export const batch = (base: SearchIndex) => {
  return (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<BatchResponse>> => {
    const wait: Wait<BatchResponse> = (response, waitRequestOptions) => {
      return waitTask(base)(response.taskID, waitRequestOptions);
    };

    return createWaitablePromise<BatchResponse>(
      base.transporter.write<BatchResponse>(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/batch', base.indexName),
          data: {
            requests,
          },
        },
        requestOptions
      ),
      wait
    );
  };
};
