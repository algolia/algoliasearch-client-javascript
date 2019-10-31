import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

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
            method: MethodEnum.Delete,
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
