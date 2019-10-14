import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { SaveSynonymsOptions } from '../types/SaveSynonymsOptions';
import { SaveSynonymsResponse } from '../types/SaveSynonymsResponse';
import { Synonym } from '../types/Synonym';
import { waitTask } from './waitTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const saveSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const mixin = waitTask(base);

  return class extends mixin implements HasSaveSynonyms {
    public saveSynonyms(
      synonyms: readonly Synonym[],
      requestOptions?: SaveSynonymsOptions & RequestOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return WaitablePromise.from<SaveSynonymsResponse>(
        this.transporter.write<SaveSynonymsResponse>(
          {
            method: Method.Post,
            path: `1/indexes/${this.indexName}/synonyms/batch`,
            data: synonyms,
          },
          requestOptions
        )
      ).onWait((response: SaveSynonymsResponse) => this.waitTask(response.taskID));
    }
  };
};

export type HasSaveSynonyms = {
  readonly saveSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
