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
    object: object,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions
  ): Readonly<WaitablePromise<SaveObjectResponse>> => {
    return createWaitablePromise<SaveObjectResponse>(
      saveObjects(base)([object], requestOptions).then<SaveObjectResponse>(response => {
        return {
          objectID: response[0].objectIDs[0],
          taskID: response[0].taskID,
        };
      }),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
