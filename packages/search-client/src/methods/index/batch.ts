import { RequestOptions, popRequestOption } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { HasWaitTask, waitTask } from './waitTask';
import { WaitablePromise } from '../../WaitablePromise';
import { BatchActionType } from '../types/BatchAction';
import { BatchResponse } from '../types/BatchResponse';
import { ChunkOptions } from '../types/ChunkOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const batch = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasBatch {
    public chunk(
      bodies: readonly object[],
      action: BatchActionType,
      requestOptions?: RequestOptions & ChunkOptions
    ): Readonly<WaitablePromise<readonly BatchResponse[]>> {
      return WaitablePromise.from<readonly BatchResponse[]>(
        new Promise(resolve => {
          // eslint-disable-next-line functional/prefer-readonly-type
          const responses: BatchResponse[] = [];

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
                responses.push(response); // eslint-disable-line functional/immutable-data

                index++;
                batching(index);
              });
            } else {
              resolve(responses);
            }
          };

          batching();
        })
      ).onWait(
        (responses: readonly BatchResponse[]): Promise<void> => {
          return new Promise(resolve => {
            Promise.all(responses.map(response => this.waitTask(response.taskID))).then(() => {
              resolve();
            });
          });
        }
      );
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
      ).onWait(
        (response: BatchResponse): Promise<void> => {
          return this.waitTask(response.taskID);
        }
      );
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

export type BatchRequest = {
  readonly action: BatchActionType;
  readonly body: object;
};
