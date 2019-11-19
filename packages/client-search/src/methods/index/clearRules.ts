import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const clearRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasClearRules => {
  return {
    ...base,
    clearRules(requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/rules/clear', base.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasClearRules = {
  readonly clearRules: (
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
