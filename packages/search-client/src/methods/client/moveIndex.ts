import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { IndexOperationResponse } from '../types/IndexOperationResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const moveIndex = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasMoveIndex {
    public moveIndex(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return WaitablePromise.from<IndexOperationResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
              operation: 'move',
              destination: to,
            },
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) => {
        return this.initIndex<HasWaitTask>(from, {
          methods: [waitTask],
        }).waitTask(response.taskID, waitRequestOptions);
      });
    }
  };
};

export type HasMoveIndex = SearchClient & {
  readonly moveIndex: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
