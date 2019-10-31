import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { SaveObjectResponse } from '../../types/SaveObjectResponse';
import { SaveObjectsOptions } from '../../types/SaveObjectsOptions';
import { SearchIndex } from '../../types/SearchIndex';
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
      return createWaitablePromise<SaveObjectResponse>(
        this.saveObjects([object], requestOptions).then<SaveObjectResponse>(response => {
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
