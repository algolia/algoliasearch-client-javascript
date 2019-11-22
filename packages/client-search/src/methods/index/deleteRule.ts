import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex, waitTask } from '../..';

export const deleteRule = (base: SearchIndex) => {
  return (
    objectID: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
