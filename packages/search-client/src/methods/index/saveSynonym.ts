import { WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SaveSynonymsOptions } from '../types/SaveSynonymsOptions';
import { SaveSynonymsResponse } from '../types/SaveSynonymsResponse';
import { SearchIndex } from '../types/SearchIndex';
import { Synonym } from '../types/Synonym';
import { HasSaveSynonyms, saveSynonyms } from './saveSynonyms';

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
