import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteIndex = (base: SearchIndex) => {
  return (requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('1/indexes/%s', base.indexName),
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
