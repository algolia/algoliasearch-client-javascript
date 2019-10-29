import { Method } from '@algolia/requester-types/src/types/Method';
import { createWaitablePromise, encode } from '@algolia/support';
import { WaitablePromise } from '@algolia/support/src/types/WaitablePromise';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { IndexOperationResponse } from '../../types/IndexOperationResponse';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { HasInitIndex, initIndex } from './initIndex';

export const moveIndex = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasInitIndex & HasMoveIndex => {
  return {
    ...initIndex(base),
    moveIndex(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return createWaitablePromise<IndexOperationResponse>(
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
    },
  };
};

export type HasMoveIndex = {
  readonly moveIndex: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
