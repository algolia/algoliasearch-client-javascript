import { createWaitablePromise } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { BatchRequest } from '../../types/BatchRequest';
import { MultipleBatchResponse } from '../../types/MultipleBatchResponse';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { HasInitIndex, initIndex } from './initIndex';

export const multipleBatch = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasInitIndex & HasMultipleBatch => {
  return {
    ...initIndex(base),
    multipleBatch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<MultipleBatchResponse>> {
      return createWaitablePromise<MultipleBatchResponse>(
        this.transporter.write(
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
            return this.initIndex<HasWaitTask>(indexName, {
              methods: [waitTask],
            }).waitTask(response.taskID[indexName], waitRequestOptions);
          })
        )
      );
    },
  };
};

export type HasMultipleBatch = {
  readonly multipleBatch: (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<MultipleBatchResponse>>;
};
