import { Method } from '@algolia/requester-types/src/types/Method';
import { createWaitablePromise, encode } from '@algolia/support';
import { WaitablePromise } from '@algolia/support/src/types/WaitablePromise';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

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
            method: Method.Post,
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
