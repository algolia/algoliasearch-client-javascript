import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { DeleteResponse } from '../types/DeleteResponse';
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
      return WaitablePromise.from<DeleteResponse>(
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
