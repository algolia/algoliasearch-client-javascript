import { Method } from '@algolia/requester-types/src/types/Method';
import { createWaitablePromise, encode } from '@algolia/support';
import { WaitablePromise } from '@algolia/support/src/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter';

import { DeleteByFiltersOptions } from '../../types/DeleteByFiltersOptions';
import { DeleteResponse } from '../../types/DeleteResponse';
import { SearchIndex } from '../../types/SearchIndex';
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
      return createWaitablePromise<DeleteResponse>(
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
