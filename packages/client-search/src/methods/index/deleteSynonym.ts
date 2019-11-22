import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DeleteResponse, DeleteSynonymOptions, SearchIndex } from '../..';
import { waitTask } from '.';

export const deleteSynonym = (base: SearchIndex) => {
  return (
    objectID: string,
    requestOptions?: DeleteSynonymOptions & RequestOptions
  ): Readonly<WaitablePromise<DeleteResponse>> => {
    return createWaitablePromise<DeleteResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('1/indexes/%s/synonyms/%s', base.indexName, objectID),
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
