import { addMethod, createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex } from '../..';
import { deleteObjects, waitTask } from '.';

export const deleteObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasDeleteObject => {
  return {
    ...base,
    deleteObject(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        addMethod(base, deleteObjects)
          .deleteObjects([objectID], requestOptions)
          .then(response => {
            return { taskID: response[0].taskID };
          })
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDeleteObject = {
  readonly deleteObject: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
