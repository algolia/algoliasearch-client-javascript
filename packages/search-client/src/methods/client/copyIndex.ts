import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';
import { TransporterAware } from '@algolia/transporter/src/TransporterAware';

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
      return WaitablePromise.from<IndexOperationResponse>(
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
