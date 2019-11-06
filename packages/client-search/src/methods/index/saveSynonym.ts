import { WaitablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsOptions, SaveSynonymsResponse, SearchIndex, Synonym } from '../..';
import { HasSaveSynonyms, saveSynonyms } from '.';

export const saveSynonym = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSaveSynonyms => {
  return {
    ...saveSynonyms(base),
    saveSynonym(
      synonym: Synonym,
      requestOptions?: RequestOptions & SaveSynonymsOptions
    ): Readonly<WaitablePromise<SaveSynonymsResponse>> {
      return this.saveSynonyms([synonym], requestOptions);
    },
  };
};

export type HasSaveSynonym = {
  readonly saveSynonym: (
    synonym: Synonym,
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
};
