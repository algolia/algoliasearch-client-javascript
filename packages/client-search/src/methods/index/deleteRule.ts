import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasDeleteRule => {
  return {
    ...base,
    deleteRule(
      objectID: string,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
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
