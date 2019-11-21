import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { CopyIndexOptions, IndexOperationResponse, initIndex, SearchClient, waitTask } from '../..';

export const copyIndex = (base: SearchClient) => {
  return (
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions
  ): Readonly<WaitablePromise<IndexOperationResponse>> => {
    return createWaitablePromise<IndexOperationResponse>(
      base.transporter.write(
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
      return initIndex(base)(from, {
        methods: { waitTask },
      }).waitTask(response.taskID, waitRequestOptions);
    });
  };
};
