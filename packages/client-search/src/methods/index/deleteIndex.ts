import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteIndex = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasDelete => {
  return {
    ...base,
    delete(requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s', base.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDelete = {
  readonly delete: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<DeleteResponse>>;
};
