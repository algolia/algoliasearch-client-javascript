import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteByFiltersOptions, DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteBy = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasDeleteBy => {
  return {
    ...base,
    deleteBy(
      filters: DeleteByFiltersOptions,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/deleteByQuery', base.indexName),
            data: filters,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
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
