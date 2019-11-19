import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ClearSynonymsOptions, DeleteResponse, SearchIndex } from '../..';
import { waitTask } from '.';

export const clearSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasClearSynonyms => {
  return {
    ...base,
    clearSynonyms(
      requestOptions?: ClearSynonymsOptions & RequestOptions
    ): Readonly<WaitablePromise<DeleteResponse>> {
      return createWaitablePromise<DeleteResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Post,
            path: encode('1/indexes/%s/synonyms/clear', base.indexName),
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasClearSynonyms = {
  readonly clearSynonyms: (
    requestOptions?: ClearSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
