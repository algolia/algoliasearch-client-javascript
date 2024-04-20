import { createWaitablePromise, encode, Wait, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
