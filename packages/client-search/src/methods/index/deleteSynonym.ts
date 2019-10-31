import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { DeleteResponse } from '../../types/DeleteResponse';
import { DeleteSynonymOptions } from '../../types/DeleteSynonymOptions';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const deleteSynonym = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasDeleteSynonym => {
  return {
    ...waitTask(base),
    deleteSynonym(
      objectID: string,
      requestOptions?: DeleteSynonymOptions & RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Delete,
            path: encode('1/indexes/%s/synonyms/%s', this.indexName, objectID),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasDeleteSynonym = {
  readonly deleteSynonym: (
    objectID: string,
    requestOptions?: DeleteSynonymOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
