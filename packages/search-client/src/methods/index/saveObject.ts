import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SaveObjectResponse } from '../types/SaveObjectResponse';
import { SaveObjectsOptions } from '../types/SaveObjectsOptions';
import { HasSaveObjects, saveObjects } from './saveObjects';
import { HasWaitTask } from './waitTask';

export const saveObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasSaveObjects & HasSaveObject => {
  return {
    ...saveObjects(base),
    saveObject(
      object: object,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Readonly<WaitablePromise<SaveObjectResponse>> {
      return WaitablePromise.from<SaveObjectResponse>(
        this.saveObjects([object], requestOptions).then(response => {
          return {
            objectID: response[0].objectIDs[0],
            taskID: response[0].taskID,
          };
        })
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasSaveObject = {
  readonly saveObject: (
    object: object,
    requestOptions?: RequestOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveObjectResponse>>;
};
