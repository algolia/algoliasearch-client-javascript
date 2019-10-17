import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { ClearSynonymsOptions } from '../types/clearSynonymsOptions';
import { DeleteResponse } from '../types/DeleteResponse';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const clearSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = waitTask(base);

  return class extends mixin implements HasClearSynonyms {
    public clearSynonyms(
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
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export type HasClearSynonyms = {
  readonly clearSynonyms: (
    requestOptions?: ClearSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
};
