import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { DeleteResponse } from '../../types/DeleteResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const clearRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasClearRules => {
  return {
    ...waitTask(base),
    clearRules(requestOptions?: RequestOptions): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/rules/clear', this.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasClearRules = {
  readonly clearRules: (
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
