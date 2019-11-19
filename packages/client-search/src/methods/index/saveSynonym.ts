import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsOptions, SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { saveSynonyms } from '.';

export const saveSynonym = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveSynonym => {
  return {
    ...base,
    saveSynonym(
      synonym: Synonym,
      requestOptions?: RequestOptions & SaveSynonymsOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return saveSynonyms(base).saveSynonyms([synonym], requestOptions);
    },
  };
};

export type HasSaveSynonym = {
  readonly saveSynonym: (
    synonym: Synonym,
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
