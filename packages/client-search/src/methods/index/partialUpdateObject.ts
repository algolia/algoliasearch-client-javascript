import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { PartialUpdateObjectResponse, PartialUpdateObjectsOptions, SearchIndex } from '../..';
import { partialUpdateObjects, waitTask } from '.';

export const partialUpdateObject = (base: SearchIndex) => {
  return (
    object: object,
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> => {
    return createWaitablePromise<PartialUpdateObjectResponse>(
      partialUpdateObjects(base)([object], requestOptions).then(response => {
        return {
          objectID: response[0].objectIDs[0],
          taskID: response[0].taskID,
        };
      })
    ).onWait((response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
  };
};
