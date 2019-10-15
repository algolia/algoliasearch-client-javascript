import { Method } from '@algolia/requester-types';
import { ConstructorOf, endpoint, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchClient } from '../../SearchClient';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { CopyIndexOptions } from '../types/CopyIndexOptions';
import { IndexOperationResponse } from '../types/IndexOperationResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const copyIndex = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasCopyIndex {
    public copyIndex(
      from: string,
      to: string,
      requestOptions?: CopyIndexOptions & RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return WaitablePromise.from<IndexOperationResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: endpoint('1/indexes/%s/operation', from),
            data: {
              operation: 'copy',
              destination: to,
            },
          },
          requestOptions
        )
      ).onWait(response => {
        return this.initIndex<HasWaitTask>(from, {
          methods: [waitTask],
        }).waitTask(response.taskID);
      });
    }
  };
};

export type HasCopyIndex = SearchClient & {
  readonly copyIndex: (
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
