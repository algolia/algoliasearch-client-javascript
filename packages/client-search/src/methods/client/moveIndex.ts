import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { waitTask } from '..';
import { IndexOperationResponse, SearchClient } from '../..';
import { initIndex } from '.';

export const moveIndex = (base: SearchClient) => {
  return (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<IndexOperationResponse>> => {
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
      return initIndex(base)(from, {
        methods: { waitTask },
      }).waitTask(response.taskID, waitRequestOptions);
    });
  };
};
