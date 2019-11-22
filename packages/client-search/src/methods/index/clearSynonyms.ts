import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ClearSynonymsOptions, DeleteResponse, SearchIndex, waitTask } from '../..';

export const clearSynonyms = (base: SearchIndex) => {
  return (
    requestOptions?: ClearSynonymsOptions & RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/synonyms/clear', base.indexName),
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
