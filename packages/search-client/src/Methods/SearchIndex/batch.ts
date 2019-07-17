import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { HasWaitTask, waitTask } from './waitTask';
import { WaitablePromise } from '../../WaitablePromise';

export const batch = <TSearchIndex extends ConstructorOf<SearchIndex & HasWaitTask>>(
  base: TSearchIndex
) => {
  return waitTask(
    class extends base implements HasBatch {
      public chunk(
        bodies: object[],
        action: Action,
        requestOptions?: RequestOptions & ChunkOptions
      ): WaitablePromise<BatchResponse[]> {
        return WaitablePromise.from<BatchResponse[]>(
          new Promise(resolve => {
            const responses: BatchResponse[] = [];
            const batchSize =
              requestOptions !== undefined && requestOptions.batchSize !== undefined
                ? requestOptions.batchSize
                : 1000;

            const batching = (lastIndex: number = 0) => {
              const bodiesChunk: Array<Record<string, any>> = [];
              let index: number;

              for (index = lastIndex; index < bodies.length; index++) {
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
        ).onWait(
          (responses: BatchResponse[]): Promise<void> => {
            return new Promise(resolve => {
              Promise.all(responses.map(response => this.waitTask(response.taskID))).then(() => {
                resolve();
              });
            });
          }
        );
      }

      public batch(
        requests: BatchRequest[],
        requestOptions?: RequestOptions
      ): WaitablePromise<BatchResponse> {
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
    }
  );
};

export interface HasBatch extends HasWaitTask {
  chunk(
    bodies: object[],
    action: string,
    requestOptions?: RequestOptions & ChunkOptions
  ): WaitablePromise<BatchResponse[]>;

  batch(requests: BatchRequest[], requestOptions?: RequestOptions): WaitablePromise<BatchResponse>;
}

export interface ChunkOptions {
  batchSize?: number;
}

export type BatchRequest = {
  action: Action;
  body: object;
};

export type BatchResponse = {
  taskID: number;
  objectIDs: string[];
};

export const enum Action {
  AddObject = 'addObject',
  UpdateObject = 'updateObject',
}
