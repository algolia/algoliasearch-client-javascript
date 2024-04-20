import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { DeleteByFiltersOptions, DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteBy = (base: SearchIndex) => {
  return (
    filters: DeleteByFiltersOptions,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/deleteByQuery', base.indexName),
          data: filters,
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
