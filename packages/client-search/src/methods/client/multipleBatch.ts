import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { HasWaitTask, waitTask } from '..';
import { BatchRequest, MultipleBatchResponse } from '../..';
import { HasInitIndex, initIndex } from '.';

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
