import { createWaitablePromise, encode } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { Method } from '@algolia/requester-common/src/types/Method';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { BatchActionType } from '../../types/BatchAction';
import { BatchRequest } from '../../types/BatchRequest';
import { BatchResponse } from '../../types/BatchResponse';
import { ChunkOptions } from '../../types/ChunkOptions';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const batch = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasBatch => {
  return {
    ...waitTask(base),
    chunk(
      bodies: readonly object[],
      action: BatchActionType,
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      const batchSize = popRequestOption(requestOptions, 'batchSize', 1000);

      // eslint-disable-next-line functional/prefer-readonly-type
      const responses: BatchResponse[] = [];

      const forEachBatch = (lastIndex: number = 0): Readonly<Promise<readonly BatchResponse[]>> => {
        // eslint-disable-next-line functional/prefer-readonly-type
        const bodiesChunk: Array<Record<string, any>> = [];
        // eslint-disable-next-line functional/no-let
        let index: number;

        /* eslint-disable-next-line functional/no-loop-statement */
        for (index = lastIndex; index < bodies.length; index++) {
          // eslint-disable-next-line functional/immutable-data
          bodiesChunk.push(bodies[index]);

          if (bodiesChunk.length === batchSize) {
            break;
          }
        }

        if (bodiesChunk.length === 0) {
          return Promise.resolve(responses);
        }

        return this.batch(
          bodiesChunk.map(body => {
            return {
              action,
              body,
            };
          }),
          requestOptions
        ).then(response => {
          // eslint-disable-next-line functional/immutable-data
          responses.push(response);
          index++;

          return forEachBatch(index);
        });
      };

      return createWaitablePromise(forEachBatch()).onWait((batchResponses, waitRequestOptions) => {
        return Promise.all(
          batchResponses.map(response => this.waitTask(response.taskID, waitRequestOptions))
        );
      });
    },

    batch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<BatchResponse>> {
      return createWaitablePromise<BatchResponse>(
        this.transporter.write<BatchResponse>(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/batch', this.indexName),
            data: {
              requests,
            },
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasBatch = HasWaitTask & {
  readonly chunk: (
    bodies: readonly object[],
    action: BatchActionType,
    requestOptions?: RequestOptions & ChunkOptions
  ) => Readonly<WaitablePromise<readonly BatchResponse[]>>;

  readonly batch: (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<BatchResponse>>;
};
