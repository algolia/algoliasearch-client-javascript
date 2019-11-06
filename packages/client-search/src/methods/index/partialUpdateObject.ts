import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { PartialUpdateObjectResponse, PartialUpdateObjectsOptions, SearchIndex } from '../..';
import { HasPartialUpdateObjects, HasWaitTask, partialUpdateObjects } from '.';

export const partialUpdateObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasPartialUpdateObjects & HasPartialUpdateObject => {
  return {
    ...partialUpdateObjects(base),
    partialUpdateObject(
      object: object,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> {
      return createWaitablePromise<PartialUpdateObjectResponse>(
        this.partialUpdateObjects([object], requestOptions).then(response => {
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

export type HasPartialUpdateObject = {
  readonly partialUpdateObject: (
    object: object,
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<PartialUpdateObjectResponse>>;
};
