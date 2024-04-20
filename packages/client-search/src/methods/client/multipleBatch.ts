import { createWaitablePromise, Wait, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import {
  initIndex,
  MultipleBatchRequest,
  MultipleBatchResponse,
  SearchClient,
  waitTask,
} from '../..';

export const multipleBatch = (base: SearchClient) => {
  return (
    requests: readonly MultipleBatchRequest[],
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<MultipleBatchResponse>> => {
    const wait: Wait<MultipleBatchResponse> = (response, waitRequestOptions) => {
      return Promise.all(
        Object.keys(response.taskID).map(indexName => {
          return initIndex(base)(indexName, {
            methods: { waitTask },
          }).waitTask(response.taskID[indexName], waitRequestOptions);
        })
      );
    };

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
      ),
      wait
    );
  };
};
