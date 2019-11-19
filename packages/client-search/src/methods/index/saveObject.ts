import { addMethod, createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveObjectResponse, SaveObjectsOptions, SearchIndex } from '../..';
import { waitTask } from '.';
import { saveObjects } from './saveObjects';

export const saveObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveObject => {
  return {
    ...base,
    saveObject(
      object: object,
      requestOptions?: RequestOptions & SaveObjectsOptions
    ): Readonly<WaitablePromise<SaveObjectResponse>> {
      return createWaitablePromise<SaveObjectResponse>(
        addMethod(base, saveObjects)
          .saveObjects([object], requestOptions)
          .then<SaveObjectResponse>(response => {
            return {
              objectID: response[0].objectIDs[0],
              taskID: response[0].taskID,
            };
          })
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
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
