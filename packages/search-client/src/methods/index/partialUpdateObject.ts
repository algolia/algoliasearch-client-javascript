import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { PartialUpdateObjectResponse } from '../../types/PartialUpdateObjectResponse';
import { PartialUpdateObjectsOptions } from '../../types/PartialUpdateObjectsOptions';
import { SearchIndex } from '../../types/SearchIndex';
import { HasPartialUpdateObjects, partialUpdateObjects } from './partialUpdateObjects';
import { HasWaitTask } from './waitTask';

export const partialUpdateObject = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasPartialUpdateObjects & HasPartialUpdateObject => {
  return {
    ...partialUpdateObjects(base),
    partialUpdateObject(
      object: object,
      requestOptions?: RequestOptions & PartialUpdateObjectsOptions
    ): Readonly<WaitablePromise<PartialUpdateObjectResponse>> {
      return WaitablePromise.from<PartialUpdateObjectResponse>(
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
