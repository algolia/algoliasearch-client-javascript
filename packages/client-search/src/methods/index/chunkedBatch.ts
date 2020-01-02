import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  batch,
  BatchActionType,
  ChunkedBatchResponse,
  ChunkOptions,
  SearchIndex,
  waitTask,
} from '../..';

export const chunkedBatch = (base: SearchIndex) => {
  return (
    bodies: readonly object[],
    action: BatchActionType,
    requestOptions?: RequestOptions & ChunkOptions
  ): Readonly<WaitablePromise<ChunkedBatchResponse>> => {
    const { batchSize, ...options } = requestOptions || {};

    const response = {
      taskIDs: [] as number[], // eslint-disable-line functional/prefer-readonly-type
      objectIDs: [] as string[], // eslint-disable-line functional/prefer-readonly-type
    };

    const forEachBatch = (lastIndex: number = 0): Readonly<Promise<ChunkedBatchResponse>> => {
      // eslint-disable-next-line functional/prefer-readonly-type
      const bodiesChunk: Array<Record<string, any>> = [];
      // eslint-disable-next-line functional/no-let
      let index: number;

      /* eslint-disable-next-line functional/no-loop-statement */
      for (index = lastIndex; index < bodies.length; index++) {
        // eslint-disable-next-line functional/immutable-data
        bodiesChunk.push(bodies[index]);

        if (bodiesChunk.length === (batchSize || 1000)) {
          break;
        }
      }

      if (bodiesChunk.length === 0) {
        return Promise.resolve(response);
      }

      return batch(base)(
        bodiesChunk.map(body => {
          return {
            action,
            body,
          };
        }),
        options
      ).then(res => {
        response.objectIDs = response.objectIDs.concat(res.objectIDs); // eslint-disable-line functional/immutable-data
        response.taskIDs.push(res.taskID); // eslint-disable-line functional/immutable-data

        index++;

        return forEachBatch(index);
      });
    };

    return createWaitablePromise(forEachBatch(), (chunkedBatchResponse, waitRequestOptions) => {
      return Promise.all(
        chunkedBatchResponse.taskIDs.map(taskID => {
          return waitTask(base)(taskID, waitRequestOptions);
        })
      );
    });
  };
};
