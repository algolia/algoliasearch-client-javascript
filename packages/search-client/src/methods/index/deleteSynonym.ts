import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

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
      return WaitablePromise.from<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Delete,
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
