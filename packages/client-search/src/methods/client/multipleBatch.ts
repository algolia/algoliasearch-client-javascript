import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { BatchRequest, initIndex, MultipleBatchResponse, SearchClient, waitTask } from '../..';

export const multipleBatch = (base: SearchClient) => {
  return (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<MultipleBatchResponse>> => {
    return createWaitablePromise<MultipleBatchResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: '1/indexes/*/batch',
          data: {
            requests,
          },
        },
        requestOptions
      )
    ).onWait((response, waitRequestOptions) =>
      Promise.all(
        Object.keys(response.taskID).map(indexName => {
          return initIndex(base)(indexName, {
            methods: { waitTask },
          }).waitTask(response.taskID[indexName], waitRequestOptions);
        })
      )
    );
  };
};
