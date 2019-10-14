import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { popRequestOption, RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { BatchActionType } from '../types/BatchAction';
import { BatchRequest } from '../types/BatchRequest';
import { BatchResponse } from '../types/BatchResponse';
import { ChunkOptions } from '../types/ChunkOptions';
import { HasWaitTask, waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const batch = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin = waitTask(base);

  return class extends mixin implements HasBatch {
    public chunk(
      bodies: readonly object[],
      action: BatchActionType,
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      return WaitablePromise.from<readonly BatchResponse[]>(
        new Promise(resolve => {
          const responses: readonly BatchResponse[] = [];

          const batchSize = popRequestOption(requestOptions, 'batchSize', 1000);

          const batching = (lastIndex: number = 0): void => {
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

            if (bodiesChunk.length > 0) {
              this.batch(
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
                batching(index);
              });
            } else {
              resolve(responses);
            }
          };

          batching();
        })
      ).onWait((responses: readonly BatchResponse[]) => {
        return Promise.all(responses.map(response => this.waitTask(response.taskID)));
      });
    }

    public batch(
      requests: readonly BatchRequest[],
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<BatchResponse>> {
      return WaitablePromise.from<BatchResponse>(
        this.transporter.write<BatchResponse>(
          {
            method: Method.Post,
            path: `1/indexes/${this.indexName}/batch`,
            data: {
              requests,
            },
          },
          requestOptions
        )
      ).onWait((response: BatchResponse): Promise<void> => this.waitTask(response.taskID));
    }
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
