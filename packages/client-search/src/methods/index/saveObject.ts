import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  ChunkOptions,
  SaveObjectResponse,
  saveObjects,
  SaveObjectsOptions,
  SearchIndex,
  waitTask,
} from '../..';

export const saveObject = (base: SearchIndex) => {
  return (
    object: Readonly<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions
  ): Readonly<WaitablePromise<SaveObjectResponse>> => {
    return createWaitablePromise<SaveObjectResponse>(
      saveObjects(base)([object], requestOptions).then<SaveObjectResponse>(response => {
        return {
          objectID: response.objectIDs[0],
          taskID: response.taskIDs[0],
        };
      }),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
