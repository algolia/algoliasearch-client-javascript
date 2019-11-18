import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { HasWaitTask, waitTask } from '..';
import { IndexOperationResponse, SearchClient } from '../..';
import { initIndex } from '.';

export const moveIndex = <TClient extends SearchClient>(base: TClient): TClient & HasMoveIndex => {
  return {
    ...base,
    moveIndex(
      from: string,
      to: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return createWaitablePromise<IndexOperationResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
              operation: 'move',
              destination: to,
            },
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) => {
        return initIndex(base)
          .initIndex<HasWaitTask>(from, {
            methods: [waitTask],
          })
          .waitTask(response.taskID, waitRequestOptions);
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
