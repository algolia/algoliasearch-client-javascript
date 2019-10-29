import { createWaitablePromise, encode } from '@algolia/client-common';
import { WaitablePromise } from '@algolia/client-common/src/types/WaitablePromise';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

import { DeleteResponse } from '../../types/DeleteResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const deleteIndex = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasDelete => {
  return {
    ...waitTask(base),
    delete(requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Delete,
            path: encode('1/indexes/%s', this.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDelete = {
  readonly delete: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<DeleteResponse>>;
};
