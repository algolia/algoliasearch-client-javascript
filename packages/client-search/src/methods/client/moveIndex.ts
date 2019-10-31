import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

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
