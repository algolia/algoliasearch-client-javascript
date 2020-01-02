import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { deleteObjects, DeleteResponse, SearchIndex, waitTask } from '../..';

export const deleteObject = (base: SearchIndex) => {
  return (
    objectID: string,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      deleteObjects(base)([objectID], requestOptions).then(response => {
        return { taskID: response.taskIDs[0] };
      }),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
