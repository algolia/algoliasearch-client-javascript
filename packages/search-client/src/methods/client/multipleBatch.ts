import { Method } from '@algolia/requester-types';
import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { BatchRequest } from '../types/BatchRequest';
import { MultipleBatchResponse } from '../types/MultipleBatchResponse';

export const multipleBatch = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasMultipleBatch => {
  return {
    ...base,
    multipleBatch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<MultipleBatchResponse>> {
      return WaitablePromise.from<MultipleBatchResponse>(
        this.transporter.write(
          {
            method: Method.Post,
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

export type HasMultipleBatch = SearchClient & {
  readonly multipleBatch: (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<MultipleBatchResponse>>;
};
