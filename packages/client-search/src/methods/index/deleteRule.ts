import { createWaitablePromise, encode } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { DeleteResponse } from '../../types/DeleteResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const deleteRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasDeleteRule => {
  return {
    ...waitTask(base),
    deleteRule(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Delete,
            path: encode('1/indexes/%s/rules/%s', this.indexName, objectID),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDeleteRule = {
  readonly deleteRule: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
