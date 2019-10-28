import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { DeleteByFiltersOptions } from '../types/DeleteByFiltersOptions';
import { DeleteResponse } from '../types/DeleteResponse';
import { HasWaitTask, waitTask } from './waitTask';

export const deleteBy = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasDeleteBy => {
  return {
    ...waitTask(base),
    deleteBy(
      filters: DeleteByFiltersOptions,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/deleteByQuery', this.indexName),
            data: filters,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDeleteBy = {
  readonly deleteBy: (
    filters: DeleteByFiltersOptions,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
