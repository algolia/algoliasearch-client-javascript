import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { popRequestOption, RequestOptions } from '@algolia/transporter';

import { BatchActionType, BatchRequest, BatchResponse, ChunkOptions, SearchIndex } from '../..';
import { waitTask } from '.';

export const batch = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasBatch => {
  return {
    ...base,
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
          batchResponses.map(response =>
            addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
          )
        );
      });
    },

    batch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<BatchResponse>> {
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
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasBatch = {
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
