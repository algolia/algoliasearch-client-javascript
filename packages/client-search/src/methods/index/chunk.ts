import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { batch, BatchActionType, BatchResponse, ChunkOptions, SearchIndex, waitTask } from '../..';

export const chunk = (base: SearchIndex) => {
  return (
    bodies: readonly object[],
    action: BatchActionType,
    requestOptions?: RequestOptions & ChunkOptions
  ): Readonly<WaitablePromise<readonly BatchResponse[]>> => {
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

      return batch(base)(
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

    return createWaitablePromise(forEachBatch(), (batchResponses, waitRequestOptions) => {
      return Promise.all(
        batchResponses.map(response => waitTask(base)(response.taskID, waitRequestOptions))
      );
    });
  };
};
