import { createWaitablePromise, encode, Wait, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { IndexOperationResponse, initIndex, SearchClient, waitTask } from '../..';

export const moveIndex = (base: SearchClient) => {
  return (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<IndexOperationResponse>> => {
    const wait: Wait<IndexOperationResponse> = (response, waitRequestOptions) => {
      return initIndex(base)(from, {
        methods: { waitTask },
      }).waitTask(response.taskID, waitRequestOptions);
    };

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
      ),
      wait
    );
  };
};
