import { createWaitablePromise, encode } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { CopyIndexOptions } from '../../types/CopyIndexOptions';
import { IndexOperationResponse } from '../../types/IndexOperationResponse';
import { HasWaitTask, waitTask } from '../index/waitTask';
import { initIndex } from './initIndex';

export const copyIndex = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasCopyIndex => {
  return {
    ...base,
    copyIndex(
      from: string,
      to: string,
      requestOptions?: CopyIndexOptions & RequestOptions
    ): Readonly<WaitablePromise<IndexOperationResponse>> {
      return createWaitablePromise<IndexOperationResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/operation', from),
            data: {
              operation: 'copy',
              destination: to,
            },
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) => {
        return initIndex(this)
          .initIndex<HasWaitTask>(from, {
            methods: [waitTask],
          })
          .waitTask(response.taskID, waitRequestOptions);
      });
    },
  };
};

export type HasCopyIndex = {
  readonly copyIndex: (
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
};
