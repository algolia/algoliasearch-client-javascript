import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { ClearSynonymsOptions } from '../../types/clearSynonymsOptions';
import { DeleteResponse } from '../../types/DeleteResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { HasWaitTask, waitTask } from './waitTask';

export const clearSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasClearSynonyms => {
  return {
    ...waitTask(base),
    clearSynonyms(
      requestOptions?: ClearSynonymsOptions & RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return WaitablePromise.from<DeleteResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: encode('1/indexes/%s/synonyms/clear', this.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasClearSynonyms = {
  readonly clearSynonyms: (
    requestOptions?: ClearSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
