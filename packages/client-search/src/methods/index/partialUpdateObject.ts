import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import {
  ChunkOptions,
  PartialUpdateObjectResponse,
  PartialUpdateObjectsOptions,
  SearchIndex,
} from '../..';
import { partialUpdateObjects, waitTask } from '.';

export const partialUpdateObject = (base: SearchIndex) => {
  return (
    object: Record<string, any>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> => {
    return createWaitablePromise<PartialUpdateObjectResponse>(
      partialUpdateObjects(base)([object], requestOptions).then(response => {
        return {
          objectID: response.objectIDs[0],
          taskID: response.taskIDs[0],
        };
      }),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
