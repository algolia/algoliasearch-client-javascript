import { addMethod, createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { PartialUpdateObjectResponse, PartialUpdateObjectsOptions, SearchIndex } from '../..';
import { partialUpdateObjects, waitTask } from '.';

export const partialUpdateObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasPartialUpdateObject => {
  return {
    ...base,
    partialUpdateObject(
      object: object,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> {
      return createWaitablePromise<PartialUpdateObjectResponse>(
        addMethod(base, partialUpdateObjects)
          .partialUpdateObjects([object], requestOptions)
          .then(response => {
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

export type HasPartialUpdateObject = {
  readonly partialUpdateObject: (
    object: object,
    requestOptions?: RequestOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<PartialUpdateObjectResponse>>;
};
