import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { DeleteResponse } from '../types/DeleteResponse';
import { deleteObjects, HasDeleteObjects } from './deleteObjects';
import { HasWaitTask } from './waitTask';

export const deleteObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasDeleteObjects & HasDeleteObject => {
  return {
    ...deleteObjects(base),
    deleteObject(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.deleteObjects([objectID], requestOptions).then(response => {
          return { taskID: response[0].taskID };
        })
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
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
