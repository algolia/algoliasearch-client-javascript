import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

export const batch = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasBatch {
    public chunk(
      bodies: object[],
      action: Action,
      requestOptions?: RequestOptions & ChunkOptions
    ): Promise<BatchResponse[]> {
      return new Promise(resolve => {
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
      });
    }

    public batch(requests: object[], requestOptions?: RequestOptions): Promise<BatchResponse> {
      return this.transporter.write(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/batch`,
          data: {
            requests,
          },
        },
        requestOptions
      );
    }
  };
};

export interface HasBatch extends SearchIndex {
  chunk(
    bodies: object[],
    action: string,
    requestOptions?: RequestOptions & ChunkOptions
  ): Promise<BatchResponse[]>;

  batch(requests: object[], requestOptions?: RequestOptions): Promise<BatchResponse>;
}

export interface ChunkOptions {
  batchSize?: number;
}

export type BatchResponse = {
  taskID: number;
  objectIDs: string[];
};

export const enum Action {
  AddObject = 'addObject',
  UpdateObject = 'updateObject',
}
